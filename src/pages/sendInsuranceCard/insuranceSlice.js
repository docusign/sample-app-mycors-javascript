/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initDocumentAPI } from "../../api";
import * as accountRepository from "../../services/accountRepository";
import documentTemplate from "../../assets/Insurance_Card_Template.docx";
import { fileToBase64 } from "../../services/fileService";

export const STATUS_LOADING = "STATUS_LOADING";
export const STATUS_SUCCESS = "STATUS_SUCCESS";
export const STATUS_FAILED = "STATUS_FAILED";

export const sendInsurance = createAsyncThunk(
  "app/sendInsuranceCard",
  async ({ signerEmail, signerName, insuranceID, insured }) => {
    const accountInfo = accountRepository.getAccountInfo();
    const api = initDocumentAPI(
      accountInfo.accountBaseUrl,
      accountInfo.accountId
    );
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
  }
);

export const insuranceSlice = createSlice({
  name: "insurance",
  initialState: {},
  reducers: {
    clearState: (state) => {
      state.status = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendInsurance.pending, (state) => {
        state.status = STATUS_LOADING;
      })
      .addCase(sendInsurance.fulfilled, (state) => {
        state.status = STATUS_SUCCESS;
      })
      .addCase(sendInsurance.rejected, (state, action) => {
        state.status = STATUS_FAILED;
        state.error = {
          title: "Sending Error",
          description:
            action.error.response?.data?.message ?? action.error.message,
        };
      });
  },
});

export const selectStatus = (state) => state.insuranceInfo.status;
export const selectError = (state) => state.insuranceInfo.error;

export default insuranceSlice.reducer;
