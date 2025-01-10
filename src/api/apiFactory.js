/* eslint-disable no-param-reassign */
import { sha256 } from "js-sha256";
import { getAuthToken } from "../services/accountRepository";


const configureInterceptors = (api) => {
  // Request interceptor for API calls
  api.interceptors.request.use(
    async (config) => {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const accessTokenInfo = getAuthToken();

      if (accessTokenInfo?.accessToken) {
        config.headers.Authorization = `Bearer ${accessTokenInfo.accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // eslint-disable-next-line no-console
      console.error(`API call failed. Error:  ${error}`);
      return Promise.reject(error);
    }
  );
  return api;
};

const createAPI = (axios) => {
  const api = configureInterceptors(
    axios.create({
      withCredentials: false,
    })
  );
  return api;
};

export const createDocumentAPI = (
  axios,
  eSignBase,
  accountBaseUrl,
  accountId
) => {
  const api = createAPI(axios);

  const createTemplate = async (description, name, emailSubject) => {
    const requestData = {
      description,
      name,
      emailSubject,
      shared: false,
      status: "created",
      recipients: {
        signers: [
          {
            recipientId: "1",
            roleName: "signer",
            routingOrder: "1",
          },
        ],
      },
    };
    const response = await api.post(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/templates`,
      requestData
    );
    return response.data.templateId;
  };

  const addDocumentToTemplate = async (templateId, documentBase64, name) => {
    const documentId = 1;
    const requestData = {
      documents: [
        {
          documentBase64,
          name,
          documentId,
          fileExtension: "docx",
          order: 1,
          pages: 1,
        },
      ],
    };
    const response = await api.put(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/templates/${templateId}/documents/${documentId}`,
      requestData
    );
    return response.data.documentIdGuid;
  };

  const addTabsToTemplate = async (templateId) => {
    const requestData = {
      signHereTabs: [
        {
          anchorString: "Employee Signature",
          anchorUnits: "pixels",
          anchorXOffset: 5,
          anchorYOffset: -22,
        },
      ],
      dateSignedTabs: [
        {
          anchorString: "Date",
          anchorUnits: "pixels",
          anchorYOffset: -22,
        },
      ],
    };
    const response = await api.post(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/templates/${templateId}/recipients/1/tabs`,
      requestData
    );
    return response.status;
  };

  const getDocumentId = async (envelopeId) => {
    const response = await api.get(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/envelopes/${envelopeId}/docGenFormFields`
    );
    return response.data.docGenFormFields[0].documentId;
  };

  const updateFormFields = async (
    documentId,
    envelopId,
    insuranceId,
    insured
  ) => {
    const requestData = {
      docGenFormFields: [
        {
          documentId,
          docGenFormFieldList: [
            {
              name: "InsuranceId",
              value: insuranceId,
            },
            {
              name: "InsuredName",
              value: insured,
            },
          ],
        },
      ],
    };

    const response = await api.put(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/envelopes/${envelopId}/docgenformfields`,
      requestData
    );
    return response.data.envelopeId;
  };

  const sendEnvelop = async (envelopId) => {
    const requestData = {
      status: "sent",
    };

    const response = await api.put(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/envelopes/${envelopId}`,
      requestData
    );
    return response.data.envelopeId;
  };

  return {
    createTemplate,
    addDocumentToTemplate,
    addTabsToTemplate,
    getDocumentId,
    updateFormFields,
    sendEnvelop
  };
};

export const createFocusedViewAPI = (
  axios,
  eSignBase,
  dsReturnUrl,
  accountBaseUrl,
  accountId
) => {
  const api = createAPI(axios);

  const createEnvelope = async (requestData) => {
    const response = await api.post(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/envelopes`,
      requestData
    );
    return response.data.envelopeId;
  };


  const getRecipientView = async (envelopeId, requestData) => {
    const response = await api.post(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}/envelopes/${envelopeId}/views/recipient`,
      requestData
    );

    return response.data.url;
  };

  return {
    getRecipientView,
    createEnvelope
  };
};

export const generateCodeVerifier = () => {
  const randomValues = new Uint8Array(32);
  window.crypto.getRandomValues(randomValues);
  return btoa(String.fromCharCode.apply(null, randomValues))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const generateCodeChallenge = (codeVerifier) => {
  const hash = sha256.arrayBuffer(codeVerifier);
  const hashArray = Array.from(new Uint8Array(hash));
  return btoa(String.fromCharCode.apply(null, hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const createAuthAPI = (
  axios,
  serviceProvider,
  authPath,
  userInfoPath,
  eSignBase,
  scopes,
  clientId,
  returnUrl
) => {
  const api = createAPI(axios);

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

  const login = async (nonce, onPopupIsBlocked) => {
    const url =
      `${serviceProvider}${authPath}` +
      `?response_type=code` +
      `&scope=${scopes}` +
      `&client_id=${clientId}` +
      `&redirect_uri=${returnUrl}` +
      `&state=${nonce}` + 
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}`;
    const loginWindow = window.open(url, "_blank");

    const newTab = loginWindow;
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      // POPUP BLOCKED
      onPopupIsBlocked();
      return false;
    }
    loginWindow.focus();
    return { window: loginWindow, nonce };
  };

  const obtainAccessToken = async (code) => {
    const requestData = {
      code: `${code}`,
      code_verifier: `${codeVerifier}`,
      grant_type: "authorization_code",
      client_id: `${clientId}`,
      code_challenge_method: "S256",
      redirect_uri: `${returnUrl}`
  
    };
  
      const response = await api.post(
        `${serviceProvider}/oauth/token`,
        requestData
      );
      
      return response.data;
  }

  const fetchUserInfo = async () => {
    const response = await api.get(`${serviceProvider}${userInfoPath}`);
    return response.data;
  };

  const fetchExternalAccountId = async (accountBaseUrl, accountId) => {
    const response = await api.get(
      `${accountBaseUrl}${eSignBase}/accounts/${accountId}`
    );
    return response.data.externalAccountId;
  };

  return { login, fetchUserInfo, fetchExternalAccountId, obtainAccessToken };
};
