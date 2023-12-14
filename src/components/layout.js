import React from "react";
import PropTypes from "prop-types";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children, style, handleShowModal }) => (
  <>
    <Header style={style} handleShowModal={handleShowModal}/>
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.shape({
    position: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  handleShowModal: PropTypes.func.isRequired
};

Layout.defaultProps = {
  style: null,
};
