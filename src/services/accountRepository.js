const TOKEN_KEY = "access_token_info_key";
const ACCOUNT_INFO_KEY = "accout_info_key"

const setAuthToken = (accessTokenInfo) => localStorage.setItem(TOKEN_KEY, JSON.stringify(accessTokenInfo));
const getAuthToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY));
const cleanAuthToken = () => localStorage.removeItem(TOKEN_KEY);

const setAccountInfo = (accountInfo) => localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(accountInfo));
const getAccountInfo = () => JSON.parse(localStorage.getItem(ACCOUNT_INFO_KEY));
const cleanAccountInfo = () => localStorage.removeItem(ACCOUNT_INFO_KEY);

export { setAuthToken, getAuthToken, cleanAuthToken, setAccountInfo, getAccountInfo, cleanAccountInfo };
