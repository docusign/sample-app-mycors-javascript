import axios from "axios";
import {
  createAuthAPI,
  createDocumentAPI,
  createFocusedViewAPI,
} from "./apiFactory";

const authenticationAPI = createAuthAPI(
  axios,
  process.env.REACT_APP_OAUTH_SERVICE_PROVIDER,
  process.env.REACT_APP_IMPLICIT_GRANT_PATH,
  process.env.REACT_APP_USER_INFO_PATH,
  process.env.REACT_APP_ESIGN_BASE,
  process.env.REACT_APP_OAUTH_SCOPES,
  process.env.REACT_APP_OAUTH_CLIENT_ID,
  process.env.REACT_APP_OAUTH_RETURN_URL
);

const initDocumentAPI = (baseAccountUrl, accountId) =>
  createDocumentAPI(
    axios,
    process.env.REACT_APP_ESIGN_BASE,
    baseAccountUrl,
    accountId
  );

const initFocusedViewAPI = (baseAccountUrl, accountId) =>
  createFocusedViewAPI(
    axios,
    process.env.REACT_APP_ESIGN_BASE,
    process.env.REACT_APP_DS_RETURN_URL,
    baseAccountUrl,
    accountId
  );

export { authenticationAPI, initDocumentAPI, initFocusedViewAPI };
