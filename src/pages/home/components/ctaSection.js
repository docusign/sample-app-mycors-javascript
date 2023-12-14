import React from "react";
import PropTypes from "prop-types";

export const CTASection = ({ title, description, buttonLink }) => (
  <section className="cta-section text-center">
    <div className="container">
      <h2 className="cta-title">{title}</h2>
      <div className="cta-description body-m">{description}</div>
      <div>
        <a href={buttonLink.href} target="_blank" rel="noopener noreferrer">
          <button type="button" className="btn-secondary cta-btn">
            <span className="gradient-text">{buttonLink.name}</span>
          </button>
        </a>
      </div>
    </div>
  </section>
);

CTASection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  buttonLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};
