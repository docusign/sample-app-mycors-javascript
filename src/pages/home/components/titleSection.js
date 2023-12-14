import React from "react";
import PropTypes from "prop-types";

export const TitleSection = ({
  title,
  subTitle,
  primaryLink,
  secondaryLink,
}) => (
  <section className="title-section text-left">
    <div className="container">
      <h1>{title}</h1>
      <div className="sub-title">{subTitle}</div>
      <div className="title-button-holder">
        {primaryLink.showLink() && (
          <button
            type="button"
            className="btn-primary title-btn-1"
            onClick={primaryLink.onClick}
          >
            {primaryLink.name}
          </button>
        )}
        {secondaryLink.showLink() && (
          <a
            href={secondaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="btn-secondary title-btn-2">
              {secondaryLink.name}
            </button>
          </a>
        )}
      </div>
    </div>
  </section>
);

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  .isRequired,
  primaryLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    showLink: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  secondaryLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    showLink: PropTypes.func.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};
