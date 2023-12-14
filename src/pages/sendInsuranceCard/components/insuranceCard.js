import React from "react";
import PropTypes from "prop-types";
import { Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const InsuranceCard = ({
  show,
  onHide,
  customer,
  onSubmit,
  onChange,
}) => {
  const { t } = useTranslation("SendInsuranceCard");

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="cont ained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="customer-wrapper">
          <h2 className="form-title text-start">{t("Card.Title")}</h2>
          <p className="form-description text-start body-l">
            {t("Card.Description")}
          </p>
          <div className="row customer-fields">
            <div className="col-md-12 mb-2">
              <Form.Group controlId={`customer-name-${customer.insuranceID}`}>
                <Form.Label>{t("Card.Name")}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-12 mb-2">
              <Form.Group
                controlId={`customer-streetAddress-${customer.insuranceID}`}
              >
                <Form.Label>{t("Card.StreetAddress")}</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-2">
              <Form.Group controlId={`customer-city-${customer.insuranceID}`}>
                <Form.Label>{t("Card.City")}</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={customer.city}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className="col-6 mb-2">
              <Form.Group controlId={`customer-state-${customer.insuranceID}`}>
                <Form.Label>{t("Card.State")}</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={customer.state}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className="col-6 mb-2">
              <Form.Group
                controlId={`customer-zipCode-${customer.insuranceID}`}
              >
                <Form.Label>{t("Card.ZipCode")}</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={customer.postalCode}
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-2">
              <Form.Group controlId={`customer-phone-${customer.insuranceID}`}>
                <Form.Label className="required-label">
                  {t("Card.Phone")}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-2">
              <Form.Group controlId={`customer-email-${customer.insuranceID}`}>
                <Form.Label className="required-label">
                  {t("Card.Email")}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={customer.email}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <button
          type="button"
          className="btn-secondary btn-small"
          onClick={onHide}
        >
          {t("Close")}
        </button>
        <button
          type="button"
          className="btn-primary btn-extra-small"
          disabled={!(customer.phone && customer.email)}
          onClick={() => onSubmit(customer)}
        >
          {t("Send")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

InsuranceCard.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    insuranceID: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.number,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

InsuranceCard.defaultProps = {
  customer: {},
};
