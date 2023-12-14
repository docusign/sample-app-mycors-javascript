import React from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";

export const Card = ({
  additionalClass,
  img,
  title,
  description,
  getStarted,
  featureTitle,
  featureList,
  onClick,
}) => (
  <div className={`col h-card ${additionalClass}`}>
    <div className="h-card-body">
      <div className="h-card-top">
        <img className="h-card-image" src={img} alt="" />
        <h3 className="h-card-title">{title}</h3>
        <h5 className="h-card-description body-m">{description}</h5>
        <button className="btn-primary" type="button" onClick={onClick}>
          {getStarted}
        </button>

        <h5 className="h-card-features body-l-bold">{featureTitle}</h5>
      </div>
      <ul className="body-m">{parse(featureList)}</ul>
    </div>
  </div>
);

Card.propTypes = {
  additionalClass: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  getStarted: PropTypes.string.isRequired,
  featureTitle: PropTypes.string.isRequired,
  featureList: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
