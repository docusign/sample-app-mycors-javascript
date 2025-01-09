import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { initEmbeddedSigningAPI } from "../../api";
import { createSigningTemplate } from "./signingTemplate";

export const useEmbeddedSigning = (AccountService, onError, onSuccess) => {
  const { t } = useTranslation("EmbeddedSigningTemplate");
  const [inProgress, setInProgress] = useState(false);
  const signingResult = useRef(null);

  const handleError = (error) => {
    setInProgress(false);
    onError(error);
  };

  const handleSuccess = () => {
    setInProgress(false);
    onSuccess();
  };

  const handleMessage = async (data) => {
    if (signingResult.current) {
      signingResult.current.close();
    }
    const { href } = data;
    const sections = href.split("?");
    const hasEvents = sections.length === 2;
    if (!hasEvents) {
      handleError(`Unexpected signing ceremony response: ${data.href}.`);
      return;
    }

    handleSuccess();
  };

  const messageListener = async (event) => {
    if (!event.data) {
      return;
    }
    const { source } = event.data;

    if (source === "dsResponse") {
      await handleMessage(event.data);
    }
  };

  useEffect(() => {
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  const embeddedSigning = async (photo) => {
    setInProgress(true);
    const accountInfo = AccountService.getAccountInfo();
    const api = initEmbeddedSigningAPI(
      accountInfo.accountBaseUrl,
      accountInfo.accountId
    );

    const signer = {
      email: accountInfo.userEmail,
      name: accountInfo.userName,
      photo,
    };
    const template = createSigningTemplate(signer, t);

    try {
      signingResult.current = await api.embeddedSigning(signer, template, () =>
        handleError({
          title: "Popup error",
          description:
            "Browser popup is blocked. Please allow it and try again",
        })
      );
    } catch (e) {
      handleError({
        title: "Embedded Signing Error",
        description: e.response?.data?.message ?? e.message,
      });
    }
  };

  return [embeddedSigning, inProgress];
};
