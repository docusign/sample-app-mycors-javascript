import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import linkIcon from "../../../assets/img/chevron-right.png";

export const ResoursesSection = ({ title, resourceList, securityNotice }) => (
  <section className="resources-section text-center">
    <div className="container">
      <h2 className="resources-title">{title}</h2>
      <ul className="resources-list">
        {resourceList.map(({ name, href }) => (
          <li key={name} className="resources-list-item">
            <a
              className="resources-link"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="gradient-text">{name}</span>
              <img className="img-link" src={linkIcon} alt="" />
            </a>
          </li>
        ))}
      </ul>
      <p className="security-notice" id="security-notice">{parse(securityNotice)}</p>
    </div>
  </section>
);

ResoursesSection.propTypes = {
  title: PropTypes.string.isRequired,
  resourceList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  securityNotice: PropTypes.string.isRequired,
};
