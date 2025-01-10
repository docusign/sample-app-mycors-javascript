import React from "react";
import { renderToString } from "react-dom/server";

const styles = {
  container: {
    maxWidth: "816px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  image: {
    maxWidth: "280px",
  },

  h2: {
    margin: "10px 0",
    fontSize: "28px",
    lineHeight: "120%",
    fontWeight: "700",
  },

  form: {
    width: "496px",
  },

  row: {
    display: "flex",
    marginBottom: "16px",
    gap: "16px",
  },

  label: {
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "left",
    marginBottom: "4px",
    fontWeight: "600",
  },

  input: {
    fontSize: "14px",
    height: "40px",
    fontFamily: "Open Sans",
  },

  marginInput: {
    marginLeft: "16px",
  },

  signature: {
    marginTop: "4em",
  },
};

export const createSigningTemplate = (signer, t) =>
  renderToString(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title />
      </head>
      <body>
        <div className="container" style={styles.container}>
          <div className="image">
            <img alt="Signer" style={styles.image} src={signer.photo} />
          </div>
          <div>
            <h2 style={styles.h2}>{t("FocusedView.Title")}</h2>
            <form style={styles.form}>
              <div className="row" style={styles.row}>
                <div>
                  <label htmlFor="full-name" style={styles.label}>
                    {t("FocusedView.FullName")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="big"
                    type="text"
                    id="full-name"
                    name="full-name"
                    defaultValue={signer.name}
                    style={{
                      ...styles.input,
                      width: "600px",
                    }}
                  />
                </div>
              </div>
              <div className="row" style={styles.row}>
                <div>
                  <label htmlFor="address" style={styles.label}>
                    {t("FocusedView.StreetAddress")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="big"
                    type="text"
                    id="address"
                    name="address"
                    style={{ ...styles.input, width: "600px" }}
                  />
                </div>
              </div>
              <div className="row" style={styles.row}>
                <div>
                  <label htmlFor="city" style={styles.label}>
                    {t("FocusedView.City")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="medium"
                    type="text"
                    id="city"
                    name="city"
                    style={{ ...styles.input, width: "285px" }}
                  />
                </div>
                <div style={styles.marginInput}>
                  <label htmlFor="state" style={styles.label}>
                    {t("FocusedView.State")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="small"
                    type="text"
                    id="state"
                    name="state"
                    style={{ ...styles.input, width: "130px" }}
                  />
                </div>
                <div style={styles.marginInput}>
                  <label htmlFor="postalCode" style={styles.label}>
                    {t("FocusedView.ZipCode")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="small"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    style={{ ...styles.input, width: "130px" }}
                  />
                </div>
              </div>
              <div className="row" style={styles.row}>
                <div>
                  <label htmlFor="phone" style={styles.label}>
                    {t("FocusedView.Phone")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="medium"
                    type="text"
                    id="phone"
                    name="phone"
                    style={{ ...styles.input, width: "285px" }}
                  />
                </div>
                <div style={styles.marginInput}>
                  <label htmlFor="email" style={styles.label}>
                    {t("FocusedView.Email")}
                  </label>
                  <input
                    data-ds-type="text"
                    className="medium"
                    type="text"
                    id="email"
                    name="email"
                    defaultValue={signer.email}
                    style={{ ...styles.input, width: "285px" }}
                  />
                </div>
              </div>
            </form>
          </div>
          <p style={styles.signature}>
            <ds-signature data-ds-recipient-id="1" name="signature" />
          </p>
        </div>
      </body>
    </html>
  );
