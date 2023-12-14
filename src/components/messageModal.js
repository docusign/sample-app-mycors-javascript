import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const MessageModal = ({ show, onHide, img, title, description }) => {
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
        <div className="modal-img-wrapper d-flex justify-content-center">
          <img src={img} alt="" />
        </div>
        <h2 className="modal-title text-center">{title}</h2>
        <p className="modal-description text-center body-l">{description}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button type="button" className="btn-primary" onClick={onHide}>
          <span className="gradient-text">{t("Close")}</span>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

MessageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
