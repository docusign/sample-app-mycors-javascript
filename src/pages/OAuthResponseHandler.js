import React, { useEffect } from "react";

export const OAuthResponseHandler = () => {
  useEffect(() => {
    const msg = { source: "oauthResponse", hash: window.location.hash || "" };
    if (window.opener) {
      window.opener.postMessage(msg, "*");
    } else {
      window.parent.postMessage(msg, "*");
    }
  }, []);

  return (
    <h2>Please close this tab or window.</h2>
  );
};
