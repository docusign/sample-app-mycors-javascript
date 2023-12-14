import React, { useState } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { Col, Collapse, Offcanvas } from "react-bootstrap";
import useBreakpoint, { SIZE_XL } from "../hooks/useBreakpoint";

import chevron from "../assets/img/chevron-down.png";

export const SeeMore = ({ title, text }) => {
  const [open, setOpen] = useState(false);
  const size = useBreakpoint();

  const handleClick = (e) => {
    setOpen(!open);
    if (e) {
      e.preventDefault();
    }
  };

  return size === SIZE_XL ? (
    <Col className="bs-holder bs-holder-col">
      <h2>
        <a className="bs-link" href="/#" role="button" onClick={handleClick}>
          {title}
          {!open && <img id="downCaret" src={chevron} alt="down caret" />}
          {open && (
            <img
              id="upCaret"
              src={chevron}
              alt="up caret"
              style={{ transform: "rotate(180deg)" }}
            />
          )}
        </a>
      </h2>
      <Collapse in={open}>
        <div className="bs">{parse(text)}</div>
      </Collapse>
    </Col>
  ) : (
    <>
      <button
        type="button"
        className="btn-primary btn-offcanvas"
        onClick={handleClick}
      >
        {title}
      </button>
      <Offcanvas
        className="bs-holder-offcanvas"
        show={open}
        onHide={handleClick}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <h2 className="bs-offcanvas-title">{title}</h2>
          <div className="bs">{parse(text)}</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

SeeMore.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
