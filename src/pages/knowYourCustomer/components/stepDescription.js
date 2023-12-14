import React from "react";
import { Row, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import PropTypes from "prop-types";

export const StepDescription = ({
  selectedCamera,
  onCameraSelected,
  cameraList,
  simpleFlow,
  img,
  onClick,
}) => {
  const { t } = useTranslation("KnowYourCustomer");

  const getCameraName = (label) => {
    const re = /(.*)( \(.*\)$)/;
    const result = re.exec(label);
    if (result === null) {
      return label;
    }
    return result[1];
  };

  return (
    <>
      <h2 className="form-title">{t("Title")}</h2>
      <p className="form-subtitle body-l">{t("Description")}</p>
      <Row className="steps">
        <div className="col-md-6 step-img">
          <img src={img} alt="" />
        </div>
        <div className="col-md-6" style={{ marginBottom: "60px" }}>
          <h3>{t("FeaturesTitle")}</h3>
          <ul className="body-m">{parse(t("FeaturesList"))}</ul>
          <h5 className="body-l-bold">{t("Step1.Title")}</h5>
          {simpleFlow ? (
            <p className="body-l step-description">{t("Step1.Description")}</p>
          ) : (
            <Form.Group className="mb-2" controlId="cameraSelect">
              <Form.Label className="body-s-bold">
                {t("Selector.Label")}
              </Form.Label>
              <Form.Select
                value={selectedCamera}
                onChange={(e) => {
                  onCameraSelected(e.target.value);
                }}
              >
                <option value="">{t("Selector.Option")}</option>
                {cameraList.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {getCameraName(camera.label)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          <h5 className="body-l-bold">{t("Step2.Title")}</h5>
          <p className="body-l step-description">{t("Step2.Description")}</p>
          {!simpleFlow && (
            <>
              <h5 className="body-l-bold">{t("Step3.Title")}</h5>
              <p className="body-l step-description">
                {t("Step3.Description")}
              </p>
            </>
          )}
        </div>
      </Row>
      <div className="d-flex buttons-holder">
        {simpleFlow ? (
          <button
            type="button"
            className="btn-primary btn-medium"
            onClick={onClick}
          >
            {t("Send")}
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary btn-medium"
            onClick={onClick}
            disabled={!selectedCamera}
          >
            {t("TakePhoto")}
          </button>
        )}
      </div>
    </>
  );
};

StepDescription.propTypes = {
  selectedCamera: PropTypes.string.isRequired,
  onCameraSelected: PropTypes.func.isRequired,
  cameraList: PropTypes.arrayOf(
    PropTypes.shape({
      deviceId: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  simpleFlow: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

StepDescription.defaultProps = {
  cameraList: [],
};
