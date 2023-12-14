import React from "react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation("Common");
  return (
    <footer className="footer">
      <div className="container text-center copyright">
        <span className="body-s">{t("Copyright")}</span>
      </div>
    </footer>
  );
};
