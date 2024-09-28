import React from "react";
import { TopBar } from "../../components/top-bar";
import styles from "./styles.module.css";
import { TitleContent } from "../../components/title-content";
import { LoadContent } from "../../components/load-content";

export const LandingPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <TopBar />
      <div className={styles.container}>
        <TitleContent />
        <LoadContent />
      </div>
    </div>
  );
};
