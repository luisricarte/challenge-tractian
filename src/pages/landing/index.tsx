import React from "react";
import { SideBar } from "../../components/side-bar";
import { TopBar } from "../../components/topbar";
import { Button } from "../../components/button";
import styles from "./styles.module.css";
import { CircleAlert, Zap } from "lucide-react";

export const LandingPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <TopBar />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.titleTextContainer}>
            <span
              style={{ fontSize: "32px", fontWeight: "600", color: "#24292F" }}
            >
              Ativos
            </span>
            <span
              style={{ fontSize: "20px", fontWeight: "400", color: "#77818C" }}
            >
              / Apex Unit
            </span>
          </div>

          <div className={styles.titleButtonContainer}>
            <Button
              name={"Sensor de Energia"}
              buttonStyle="SECONDARY"
              icon={<Zap color="#2188FF" />}
            />
            <Button
              name={"Crítico"}
              buttonStyle="SECONDARY"
              icon={<CircleAlert color="#2188FF" />}
            />
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
