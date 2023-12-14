import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar, Offcanvas } from "react-bootstrap";
import PropTypes from "prop-types";

export const HeaderWithToggle = ({ icon, handleLogout, accountinfo }) => {
  const { t } = useTranslation("Common");
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <>
      <Navbar.Toggle
        aria-controls="header-offcanvas"
        onClick={() => setShowOffcanvas(true)}
      >
        <img src={icon} alt="Toggle icon" className="toggle-icon" />
      </Navbar.Toggle>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        backdrop
        className="header-offcanvas"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <div className="offcanvas-name">
            <h3>{accountinfo.userName}</h3>
            <div className="body-m" style={{ color: "#676C73" }}>
              {accountinfo.userEmail}
            </div>
          </div>
          <div className="offcanvas-footer">
            <hr />
            <a
              className="nav-link resources-link"
              href={t("GitHub.Link")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("GitHub.Name")}
            </a>
            <div
              className="resources-link logout"
              aria-hidden="true"
              role="button"
              onClick={() => {
                setShowOffcanvas(false);
                handleLogout();
              }}
            >
              {t("Logout")}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

HeaderWithToggle.propTypes = {
  icon: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  accountinfo: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  }),
};

HeaderWithToggle.defaultProps = {
  accountinfo: {},
};
