import React, { useEffect } from "react";

export const DsResponseHandler = () => {
  useEffect(() => {
    const msg = {
      source: "dsResponse",
      hash: window.location.hash || "",
      href: window.location.href || "",
    };
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
