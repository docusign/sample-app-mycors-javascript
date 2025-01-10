import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar } from "react-bootstrap";
import PropTypes from "prop-types";
import logo from "../assets/img/logo.svg";
import * as accountRepository from "../services/accountRepository";
import { logout } from "../hooks/usePckeAuth";
import useBreakpoint, { SIZE_MD, SIZE_SM } from "../hooks/useBreakpoint";
import whiteToggleIcon from "../assets/img/white-links.png";
import blackToggleIcon from "../assets/img/black-links.png";
import { HeaderWithToggle } from "./headerWithToggle";
import { HeaderWithDropdown } from "./headerWithDropdown";

export const Header = ({ style, handleShowModal}) => {
  const { t } = useTranslation("Common");
  const size = useBreakpoint();

  const accountinfo = accountRepository.getAccountInfo();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    if(window.location.pathname === "/"){
      handleShowModal();
    } else {
      navigate("/");
    }
  };

  return (
    <header className="header" role="banner" style={style}>
      <Navbar
        expand="md"
        variant="light"
        style={style && { boxShadow: "none" }}
      >
        <div>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <span className="navbar-name">{t("ApplicationName")}</span>
        </div>

        <div>
          {accountinfo &&
            (size === SIZE_SM || size === SIZE_MD ? (
              <HeaderWithToggle
                icon={style ? whiteToggleIcon : blackToggleIcon}
                handleLogout={handleLogout}
                accountinfo={accountinfo}
              />
            ) : (
              <HeaderWithDropdown
                handleLogout={handleLogout}
                accountinfo={accountinfo}
              />
            ))}
          {!accountinfo && (
            <a
              className="nav-link resources-link"
              href={t("GitHub.Link")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("GitHub.Name")}
            </a>
          )}
        </div>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  style: PropTypes.shape({
    position: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  handleShowModal: PropTypes.func.isRequired
};

Header.defaultProps = {
  style: null,
};
