import React from "react";
import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";

export const HeaderWithDropdown = ({ handleLogout, accountinfo }) => {
  const { t } = useTranslation("Common");

  return (
    <div className="d-flex">
      <a
        className="nav-link resources-link"
        href={t("GitHub.Link")}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t("GitHub.Name")}
      </a>
      <div className="ml-auto header-dropdown">
        <NavDropdown
          title={accountinfo.userEmail}
          id="user-dropdown"
          className="resources-link"
        >
          <div className="dropdown-element">
            <div className="body-l-bold">{accountinfo.userName}</div>
            <div className="body-m" style={{ color: "#676C73" }}>
              {accountinfo.userEmail}
            </div>
          </div>
          <hr className="dropdown-divider" />
          <div
            className="resources-link dropdown-element logout"
            aria-hidden="true"
            role="button"
            onClick={handleLogout}
          >
            {t("Logout")}
          </div>
        </NavDropdown>
      </div>
    </div>
  );
};

HeaderWithDropdown.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  accountinfo: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  }),
};

HeaderWithDropdown.defaultProps = {
  accountinfo: {},
};
