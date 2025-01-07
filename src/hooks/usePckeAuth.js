import { useEffect, useState, useRef } from "react";
import { authenticationAPI } from "../api";
import * as accountRepository from "../services/accountRepository";

export const needToLogin = () => !accountRepository.getAccountInfo();
export const logout = async () => {
  accountRepository.cleanAuthToken();
  accountRepository.cleanAccountInfo();
  localStorage.logoutModalState = true;
};

export const useImplicitGrantAuth = (onError, onSuccess) => {
  const loginResult = useRef(null);
  const [inProgress, setInProgress] = useState(false);

  const handleError = (error) => {
    setInProgress(false);
    onError(error);
  };

  const handleSuccess = (data) => {
    setInProgress(false);
    accountRepository.setAccountInfo(data);
    onSuccess(data);
  };

  const getUserInfo = async () => {
    let userInfoResponse;
    try {
      userInfoResponse = await authenticationAPI.fetchUserInfo();
    } catch (e) {
      handleError({
        title: "Problem while completing login.",
        description: `Error: ${e.toString()}. Please repeat your login.`,
      });
      return false;
    }

    const userInfo = {
      name: userInfoResponse.name,
      userId: userInfoResponse.sub,
      email: userInfoResponse.email,
      accounts: userInfoResponse.accounts.map((a) => ({
        accountId: a.account_id,
        accountExternalId: null,
        accountName: a.account_name,
        accountIsDefault: a.is_default,
        accountBaseUrl: a.base_uri,
      })),
    };

    const defaultAccount = userInfo.accounts.find((a) => a.accountIsDefault);
    if (defaultAccount) {
      userInfo.defaultAccountId = defaultAccount.accountId;
      userInfo.defaultAccountName = defaultAccount.accountName;
      userInfo.defaultAccountBaseUrl = defaultAccount.accountBaseUrl;
    }

    return userInfo;
  };

  const mapToAccountInfo = (userInfo) => ({
    accountId: userInfo.defaultAccountId,
    accountBaseUrl: userInfo.defaultAccountBaseUrl,
    userName: userInfo.name,
    userEmail: userInfo.email,
  });

  const parseSearch = (search) => {
    const queryString = search.startsWith('?') ? search.slice(1) : search;
    const items = queryString.split(/=|&/);
  
    let i = 0;
    const response = {};
  
    while (i + 1 < items.length) {
      response[decodeURIComponent(items[i])] = decodeURIComponent(items[i + 1]);
      i += 2;
    }
  
    return response;
  };
  

  const handleMessage = async () => {
    if (loginResult.current.window) {
      loginResult.current.window.close();
    }
    
    const response = parseSearch(loginResult.current.window.location.search);

    const obtainAccessTokenResponse = await authenticationAPI.obtainAccessToken(response.code);

    const newState = response.state;
    if (newState !== loginResult.current.nonce) {
      handleError({
        title: "Bad state response",
        description: "Possible attacker!?!",
      });
      return;
    }

    const accessTokenInfo = {
      accessToken: obtainAccessTokenResponse.access_token,
      accessTokenExpires: new Date(Date.now() + response.expires_in * 1000),
    };
    accountRepository.setAuthToken(accessTokenInfo);
    const userInfo = await getUserInfo();
    if (userInfo) {
      const accountInfo = mapToAccountInfo(userInfo);
      handleSuccess(accountInfo);
    }
  };

  const messageListener = async (event) => {
    if (!event.data) {
      return;
    }
    const { source } = event.data;

    if (source === "oauthResponse") {
      await handleMessage(event.data);
    }
  };

  useEffect(() => {
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  const login = async () => {
    const accountInfo = accountRepository.getAccountInfo();
    if (accountInfo) {
      onSuccess(accountInfo);
    } else {
      setInProgress(true);
      const nonce = Date.now().toString();
      loginResult.current = await authenticationAPI.login(nonce, () =>
        handleError({
          title: "Popup error",
          description:
            "Browser popup is blocked. Please allow it and try again",
        })
      );
    }
  };

  return [login, inProgress];
};
