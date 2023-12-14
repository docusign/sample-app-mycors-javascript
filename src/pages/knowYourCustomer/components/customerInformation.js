import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export const CustomerInformation = ({ photo, onBack, onSave }) => {
  const { t } = useTranslation("KnowYourCustomer");

  return (
    <>
      <h2 className="form-title">{t("Title")}</h2>
      <p className="form-subtitle">{t("Description")}</p>
      <div className="text-start img-holder">
        <img src={photo} alt="" />
      </div>
      <div className="d-flex buttons-holder">
        <button
          type="button"
          className="btn-secondary btn-small"
          onClick={onBack}
        >
          {t("Back")}
        </button>
        <button
          type="button"
          className="btn-primary btn-extra-small"
          onClick={onSave}
        >
          {t("Send")}
        </button>
      </div>
    </>
  );
};

CustomerInformation.propTypes = {
  photo: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
