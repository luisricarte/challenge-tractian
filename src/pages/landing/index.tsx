import React from "react";
import { SideBar } from "../../components/side-bar";
import { TopBar } from "../../components/topbar";
import styles from "./styles.module.css";
import { TitleContent } from "../../components/titleContent";

export const LandingPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <TopBar />
      <div className={styles.container}>
        <TitleContent />

        <SideBar />

        <div id="right-show-bar"></div>
      </div>
    </div>
  );
};
