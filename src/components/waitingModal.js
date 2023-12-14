import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Loader } from "./loader";

export const WaitingModal = ({ show, onHide, title, description }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    keyboard={false}
  >
    <Modal.Body>
      <Loader />
      <h2 className="modal-title text-center">{title}</h2>
      <p className="modal-description text-center body-l">{description}</p>
    </Modal.Body>
  </Modal>
);

WaitingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
