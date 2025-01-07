import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row } from "react-bootstrap";
import parse from "html-react-parser";
import {
  useImplicitGrantAuth,
  needToLogin
} from "../../hooks/usePckeAuth";
import { Card, Layout, WaitingModal, MessageModal } from "../../components";
import { CTASection, TitleSection, ResoursesSection } from "./components";

import img1 from "../../assets/img/img-case1.svg";
import img2 from "../../assets/img/img-case2.svg";
import { ErrorModal } from "../../components/errorModal";

const Home = () => {
  const { t } = useTranslation("Home");

  const [error, setError] = useState({ title: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const logoutState = localStorage.logoutModalState ? JSON.parse(localStorage.logoutModalState) : false;
  const [ showLoginModal, setShowLoginModal] = useState(logoutState);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const navigationUrl = useRef("/");

  const handleSuccessLogin = () => {
    navigate(navigationUrl.current);
  };

  const [login, inProgress] = useImplicitGrantAuth(
    (err) => {
      setError(err);
      setShowErrorModal(true);
    },
    () => handleSuccessLogin()
  );

  const handleLogin = async (navigateTo) => {
    navigationUrl.current = navigateTo;
    await login();
  };

  const HideModal = ()=>{
    localStorage.logoutModalState = false;
    setShowLoginModal(false);
  }

  const handleShowModal = ()=>{
    setShowLoginModal(true);
  }

  useEffect(() => {
    if (inProgress) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [inProgress]);

  const resourceList = [
    {
      name: t("Resources.First.Name"),
      href: t("Resources.First.Link"),
    },
    {
      name: t("Resources.Second.Name"),
      href: t("Resources.Second.Link"),
    },
    {
      name: t("Resources.Third.Name"),
      href: t("Resources.Third.Link"),
    },
  ];

  return (
    <Layout style={{ position: "absolute", color: "white" }} handleShowModal={handleShowModal} >
      <div className="home-page">
        <div className="container-fluid home-container">
          <div className="hero-background" />
          <div className="hero" />
          <div className="justify-content-center text-center d-flex ">
            <Row className="cards-container row d-flex justify-content-center">
              <TitleSection
                title={t("Header1")}
                subTitle={parse(t("Header2"))}
                primaryLink={{
                  name: t("LogInButton"),
                  onClick: () => handleLogin(),
                  showLink: () => needToLogin(),
                }}
                secondaryLink={{
                  name: t("CreateAccountButton.Name"),
                  href: t("CreateAccountButton.Link"),
                  showLink: () => needToLogin(),
                }}
              />
              <Card
                additionalClass="card-1"
                img={img1}
                title={t("Card1.Title")}
                description={t("Card1.Description")}
                onClick={() => {
                  handleLogin("/send-insurance-card");
                }}
                getStarted={t("Card1.Button")}
                featureTitle={t("Card1.FeaturesTitle")}
                featureList={t("Card1.FeaturesList")}
              />
              <Card
                additionalClass="card-2"
                img={img2}
                title={t("Card2.Title")}
                description={t("Card2.Description")}
                onClick={() => {
                  handleLogin("/know-your-customer");
                }}
                getStarted={t("Card2.Button")}
                featureTitle={t("Card2.FeaturesTitle")}
                featureList={t("Card2.FeaturesList")}
              />
            </Row>
          </div>
        </div>
        <CTASection
          title={t("Footer1")}
          description={parse(t("Footer2"))}
          buttonLink={{
            name: t("LearnMoreButton.Name"),
            href: t("LearnMoreButton.Link"),
          }}
        />
        <ResoursesSection
          title={t("Resources.Title")}
          resourceList={resourceList}
          securityNotice={t("SecurityNotice")}
        />
        <WaitingModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={t("Modal.Title")}
          description={t("Modal.Description")}
        />
        <ErrorModal
          show={showErrorModal}
          onHide={() => setShowErrorModal(false)}
          error={error}
          title={t("Modal.Title")}
          description={t("Modal.Description")}
        />
        <MessageModal
          show={showLoginModal}
          onHide={() => HideModal()}
          description={t("LogoutModalMessage")}
        />
      </div>
    </Layout>
  );
};
export default Home;
