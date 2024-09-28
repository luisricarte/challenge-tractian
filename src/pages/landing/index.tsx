import React from "react";
import { SideBar } from "../../components/side-bar";
import { TopBar } from "../../components/topbar";
import { Button } from "../../components/button";
import styles from "./styles.module.css";

export const LandingPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <div id="top-bar">
        <TopBar />
      </div>
      <div className={styles.container}>
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
    </div>
  );
};
