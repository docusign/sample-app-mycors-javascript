import { useState } from "react";
import { initDocumentAPI } from "../../api";
import * as accountRepository from "../../services/accountRepository";
import documentTemplate from "../../assets/Insurance_Card_Template.docx";
import { fileToBase64 } from "../../services/fileService";

export const STATUS_LOADING = "STATUS_LOADING";
export const STATUS_SUCCESS = "STATUS_SUCCESS";
export const STATUS_FAILED = "STATUS_FAILED";

export const useGenerateDocument = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setStatus(STATUS_FAILED);
    setError({
      title: "Sending Error",
      description: err.response?.data?.message ?? err.message,
    });
  };

  const handleSuccess = () => {
    setStatus(STATUS_SUCCESS);
  };

  const clearState = () => {
    setStatus(null);
    setStatus(null);
  };

  const sendDocument = async ({
    signerEmail,
    signerName,
    insuranceID,
    insured,
  }) => {
    setStatus(STATUS_LOADING);

    const accountInfo = accountRepository.getAccountInfo();
    const api = initDocumentAPI(
      accountInfo.accountBaseUrl,
      accountInfo.accountId
    );

    try {
      const templateId = await api.createTemplate(
        process.env.REACT_APP_INSURANCE_DOCUMENT_TEMPLATE_DESCRIPTION,
        process.env.REACT_APP_INSURANCE_DOCUMENT_TEMPLATE_NAME,
        process.env.REACT_APP_INSURANCE_DOCUMENT_TEMPLATE_EMAIL_SUBJECT
      );
      const documentBase64 = await fileToBase64(documentTemplate);
      await api.addDocumentToTemplate(
        templateId,
        documentBase64,
        process.env.REACT_APP_INSURANCE_DOCUMENT_NAME
      );
      await api.addTabsToTemplate(templateId);

      const requestData = {
        templateId,
        templateRoles: [
          {
            email: signerEmail,
            name: signerName,
            roleName: "signer",
          },
        ],
        status: "created",
      };

      const envelopId = await api.createEnvelop(requestData);
      const documentId = await api.getDocumentId(envelopId);
      await api.updateFormFields(documentId, envelopId, insuranceID, insured);
      await api.sendEnvelop(envelopId);

      handleSuccess();
    } catch (err) {
      handleError(err);
    }
  };

  return [sendDocument, clearState, status, error];
};
