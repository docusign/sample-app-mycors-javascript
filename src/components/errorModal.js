import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import errorImg from "../assets/img/error.svg";

export const ErrorModal = ({ show, onHide, error, title, description }) => {
  const { t } = useTranslation("Common");

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="d-flex justify-content-start modal-error">
          <div className="col-md-1 error-img">
            <img src={errorImg} alt="" />
          </div>
          <div className="col-md-11 error-message">
            <h3 className="text-start error-title">{error?.title}</h3>
            <p className="text-start error-description body-l">
              {error?.description}
            </p>
          </div>
        </div>
        <h2 className="modal-title text-center">{title}</h2>
        <p className="modal-description text-center body-l">{description}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button
          type="button"
          className="btn-primary btn-medium"
          onClick={onHide}
        >
          {t("Close")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  error: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
