import React from "react";
import styles from "./style.module.css";
import { Button } from "../button";
import { CircleAlert, Zap } from "lucide-react";

export const TitleContent = () => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleTextContainer}>
        <span style={{ fontSize: "32px", fontWeight: "600", color: "#24292F" }}>
          Ativos
        </span>
        <span style={{ fontSize: "20px", fontWeight: "400", color: "#77818C" }}>
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
  );
};
