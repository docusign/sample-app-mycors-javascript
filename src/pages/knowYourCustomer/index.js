import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  SeeMore,
  Layout,
  WaitingModal,
  ErrorModal,
  MessageModal,
} from "../../components";
import { CustomerInformation, PhotoModal, StepDescription } from "./components";
import { useEmbeddedSigning } from "./useEmbeddedSigning";
import * as accountRepository from "../../services/accountRepository";
import { fileToBase64 } from "../../services/fileService";
import success from "../../assets/img/success.svg";
import warning from "../../assets/img/warning.svg";
import templatePhoto from "../../assets/img/templatePhoto.png";
import defaultPhoto from "../../assets/img/defaultPhoto.png";

const KnowYourCustomer = () => {
  const { t } = useTranslation("KnowYourCustomer");
  const [cameraPermission, setCameraPermission] = useState(false);
  const [cameraList, setCameraList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [photo, setPhoto] = useState("");
  const [simpleFlow, setSimpleFlow] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [error, setError] = useState({ title: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const [showWaitingModal, setWaitingModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [embeddedSigning, inProgress] = useEmbeddedSigning(
    accountRepository,
    (err) => {
      setError(err);
      setShowErrorModal(true);
    },
    () => {
      setLastStep(false);
      setPhoto("");
      setShowSuccessModal(true);
    }
  );

  useEffect(() => {
    if (inProgress) {
      setWaitingModal(true);
    } else {
      setWaitingModal(false);
    }
  }, [inProgress]);

  const handleSigning = async () => {
    const signerPhoto =
      photo ||
      `data:image/png;base64, ${await fileToBase64("Photo.png", defaultPhoto)}`;
    await embeddedSigning(signerPhoto);
  };

  useEffect(() => {
    async function handleCameraPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setCameraPermission(true);

        // Fetch and set the list of available cameras
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameraList(cameras);
      } catch {
        setShowWarningModal(true);
        setCameraPermission(false);
        setSimpleFlow(true);
      }
    }

    if (!cameraPermission) {
      handleCameraPermission();
    }
  }, []);

  const handleCameraSelected = (deviceId) => {
    setSelectedCamera(deviceId);
  };

  return (
    <Layout>
      <section className="content-section">
        <Container className="kyc-page-container">
          <Row className="justify-content-center">
            <div className="form-holder">
              {lastStep ? (
                <CustomerInformation
                  photo={photo}
                  onBack={() => {
                    setShowModal(true);
                    setLastStep(false);
                    setPhoto("");
                  }}
                  onSave={handleSigning}
                />
              ) : (
                <StepDescription
                  selectedCamera={selectedCamera}
                  onCameraSelected={handleCameraSelected}
                  cameraList={cameraList}
                  img={simpleFlow ? defaultPhoto : templatePhoto}
                  simpleFlow={simpleFlow}
                  onClick={() =>
                    simpleFlow ? handleSigning() : setShowModal(true)
                  }
                />
              )}
            </div>
            <SeeMore title={t("SeeMore.Title")} text={t("SeeMore.Text")} />
            <MessageModal
              show={showWarningModal}
              onHide={() => setShowWarningModal(false)}
              img={warning}
              title={t("WarningModal.Title")}
              description={t("WarningModal.Description")}
            />
            <PhotoModal
              show={showModal}
              onHide={() => setShowModal(false)}
              deviceId={selectedCamera}
              photo={photo}
              setPhoto={setPhoto}
              onCrop={() => {
                setShowModal(false);
                setLastStep(true);
              }}
            />
            <WaitingModal
              show={showWaitingModal}
              onHide={() => showWaitingModal(false)}
              title={t("WaitingModal.Title")}
              description={t("WaitingModal.Description")}
            />
            <ErrorModal
              show={showErrorModal}
              onHide={() => setShowErrorModal(false)}
              error={error}
              title={t("ErrorModal.Title")}
              description={t("ErrorModal.Description")}
            />
            <MessageModal
              show={showSuccessModal}
              onHide={() => setShowSuccessModal(false)}
              img={success}
              title={t("SuccessModal.Title")}
              description={t("SuccessModal.Description")}
            />
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default KnowYourCustomer;
