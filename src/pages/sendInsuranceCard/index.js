import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  SeeMore,
  Layout,
  WaitingModal,
  ErrorModal,
  MessageModal,
} from "../../components";
import customers from "../../data/InsuranceCustomers.json";
import { InsuranceCard, InsuranceCustomersList } from "./components";
import success from "../../assets/img/success.svg";
import {
  useGenerateDocument,
  STATUS_LOADING,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "./useGenerateDocument";

const SendInsuranceCard = () => {
  const { t } = useTranslation("SendInsuranceCard");

  const [currentCustomer, setCurrentCustomer] = useState({});
  const [showInsuranceCard, setShowInsuranceCard] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [sendDocument, clearState, status, error] = useGenerateDocument();

  useEffect(
    () => () => {
      clearState();
    },
    []
  );

  useEffect(() => {
    switch (status) {
      case STATUS_LOADING:
        setShowInsuranceCard(false);
        setShowErrorModal(false);
        setShowSuccessModal(false);
        setShowWaitingModal(true);
        break;
      case STATUS_SUCCESS:
        setShowInsuranceCard(false);
        setShowErrorModal(false);
        setShowSuccessModal(true);
        setShowWaitingModal(false);
        break;
      case STATUS_FAILED:
        setShowInsuranceCard(false);
        setShowErrorModal(true);
        setShowSuccessModal(false);
        setShowWaitingModal(false);
        break;
      default:
        setShowInsuranceCard(false);
        setShowErrorModal(false);
        setShowSuccessModal(false);
        setShowWaitingModal(false);
        break;
    }
  }, [status]);

  const handleSelectCustomer = (customer) => {
    setCurrentCustomer(customer);
    setShowInsuranceCard(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentCustomer((values) => ({ ...values, [name]: value }));
  };

  const handleSendInsurance = (customer) => {
    const {
      name: signerName,
      email: signerEmail,
      insuranceID,
      name: insured,
    } = customer;
    sendDocument({ signerEmail, signerName, insuranceID, insured });
  };

  return (
    <Layout>
      <section className="content-section">
        <Container>
          <Row className="justify-content-center">
            <div className="form-holder">
              <h2 className="form-title">{t("Title")}</h2>
              <p className="form-description body-l">{t("Description")}</p>
              <InsuranceCustomersList
                customers={customers}
                onSelectCustomer={handleSelectCustomer}
              />
              <InsuranceCard
                show={showInsuranceCard}
                onHide={() => setShowInsuranceCard(false)}
                customer={currentCustomer}
                onChange={handleChange}
                onSubmit={handleSendInsurance}
              />
              <MessageModal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                img={success}
                title={t("SuccessModal.Title")}
                description={t("SuccessModal.Description")}
              />
              <ErrorModal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                error={error}
                title={t("ErrorModal.Title")}
                description={t("ErrorModal.Description")}
              />
              <WaitingModal
                show={showWaitingModal}
                onHide={() => {}}
                title={t("WaitingModal.Title")}
                description={t("WaitingModal.Description")}
              />
            </div>
            <SeeMore title={t("SeeMore.Title")} text={t("SeeMore.Text")} />
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default SendInsuranceCard;
