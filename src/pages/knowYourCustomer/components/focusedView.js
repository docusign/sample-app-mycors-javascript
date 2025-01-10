import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { initFocusedViewAPI } from "../../../api";
import * as accountRepository from "../../../services/accountRepository";
import { createSigningTemplate } from "../signingTemplate";

const createEnvelope = async (envelopeDefinition) => {
  const accountInfo = accountRepository.getAccountInfo();
  const api = initFocusedViewAPI(accountInfo.accountBaseUrl, accountInfo.accountId);
  const envelopeId = await api.createEnvelope(envelopeDefinition);
  return envelopeId;
};

const createRecipientView = async (envelopeId, requestData) => {
  const accountInfo = accountRepository.getAccountInfo();
  const api = initFocusedViewAPI(accountInfo.accountBaseUrl, accountInfo.accountId);
  const recipientView = await api.getRecipientView(envelopeId, requestData);
  return recipientView;
};

const createEnvelopDefinition = async (signerEmail, signerName, signerClientId, userPhoto, t) => {

  const template = createSigningTemplate({name: signerName, email: signerEmail, photo: userPhoto}, t);
  const document = {
      name: process.env.REACT_APP_EMBEDDED_DOCUMENT_NAME,
      documentId: 1,
      htmlDefinition: {
        source: template,
      }
    }

  const signHere1 = {
    anchorString: "/sn1/",
    anchorYOffset: "10",
    anchorUnits: "pixels",
    anchorXOffset: "20",
  };

  const signer1 = {
    email: signerEmail,
    name: signerName,
    clientUserId: signerClientId,
    recipientId: 1,
    tabs: {
      signHereTabs: [signHere1],
    },
  };

  return {
    emailSubject: "Please sign this document",
    documents: [document],
    recipients: { signers: [signer1] },
    status: "sent",
  };
};

const createRecipientViewDefinition = (dsReturnUrl, signerEmail, signerName, signerClientId, dsPingUrl) => ({
  returnUrl: `${dsReturnUrl}/know-your-customer?state=123`,
  authenticationMethod: "none",
  email: signerEmail,
  userName: signerName,
  clientUserId: signerClientId,
  pingFrequency: 600,
  pingUrl: dsPingUrl,
  frameAncestors: [ window.location.origin, 'https://apps-d.docusign.com', 'https://demo.docusign.net'],
  messageOrigins: ['https://apps-d.docusign.com'],
});

export const FocusedView = (args) => {

  const { t } = useTranslation("EmbeddedSigningTemplate");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { photo } = args;

        const accountInfo = accountRepository.getAccountInfo();

        const envelope = await createEnvelopDefinition(accountInfo.userEmail, accountInfo.userName, 1000, photo, t);

        const originEnvelopeId = await createEnvelope(envelope);

        const recipientViewDefinition = createRecipientViewDefinition(
          window.location.origin,
          accountInfo.userEmail,
          accountInfo.userName,
          1000,
          window.location.origin
        );

        const recipientViewUrl = await createRecipientView(originEnvelopeId, recipientViewDefinition);

        const docusign = await window.DocuSign.loadDocuSign(process.env.REACT_APP_OAUTH_CLIENT_ID);
        const signing = docusign.signing({
          url: recipientViewUrl,
          displayFormat: "focused",
          style: {
            branding: {
              primaryButton: {
                backgroundColor: "#333",
                color: "#fff",
              },
            },
            signingNavigationButton: {
              finishText: "You have finished the document! Continue!",
              position: "bottom-center",
            },
          },
        });
        
        signing.on("ready", () => {
          console.log("UI is rendered");
        });

        signing.on("sessionEnd", (event) => {
          window.location.reload();
          console.log("Session ended:", event);
        });

        signing.mount("#agreement");
      } catch (error) {
        console.error("Error fetching recipient view:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Signing</h2>
      <div
        id="agreement"
        className="docusign-agreement"
        style={{
          width: "100%",
          height: "800px",
          padding: "25px"
        }}
      />
    </div>
  );
};
