import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/main.scss";
import SendInsuranceCard from "./pages/sendInsuranceCard";
import { OAuthResponseHandler } from "./pages/OAuthResponseHandler";
import Home from "./pages/home";
import KnowYourCustomer from "./pages/knowYourCustomer";
import { DsResponseHandler } from "./pages/DsResponseHandler";

const App = () => (
    <Suspense fallback="">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/send-insurance-card" element={<SendInsuranceCard />} />
        <Route path="/know-your-customer" element={<KnowYourCustomer />} />
        <Route
          path="/oauth-response-handler"
          element={<OAuthResponseHandler />}
        />
        <Route path="/ds-response-handler" element={<DsResponseHandler />} />
      </Routes>
    </Suspense>
  );
export default App;
