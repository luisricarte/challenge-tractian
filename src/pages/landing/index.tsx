import React from "react";
import { SideBar } from "../../components/side-bar";
import { TopBar } from "../../components/topbar";
import { Button } from "../../components/button";

export const LandingPage: React.FC = () => {
  return (
    <div>
      <div id="top-bar">
        <TopBar />
      </div>
      <div>
        <h1>Ativos / Apex Unit</h1>
        <div id="button-content">
          <Button name={"tipo1"} />
          <Button name={"tipo2"} />
        </div>
      </div>

      <div id="left-side-bar">
        <SideBar />
      </div>
      <div id="right-show-bar"></div>
    </div>
  );
};
