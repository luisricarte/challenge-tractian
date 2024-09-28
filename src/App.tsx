import React from "react";
import "./styles/global.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};
export default App;
