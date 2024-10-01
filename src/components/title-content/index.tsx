import React, { useEffect } from "react";
import styles from "./style.module.css";
import { Button } from "../button";
import { Waves, Zap } from "lucide-react";
import { useFilterSensorContext } from "../../contexts/FilterSensorContext";

export const TitleContent = () => {
  const { sensorType, setSensorType } = useFilterSensorContext();

  useEffect(() => {
    renderButtons();
  }, [sensorType]);

  const renderButtons = () => {
    return (
      <>
        <Button
          name={"Sensor de Energia"}
          buttonStyle={sensorType === "energy" ? "ACTIVE" : "SECONDARY"}
          icon={<Zap color={sensorType === "energy" ? "#fff" : "#2188FF"} />}
          onClick={() => {
            sensorType === "energy"
              ? setSensorType(null)
              : setSensorType("energy");
          }}
        />
        <Button
          name={"Sensor de Vibração"}
          buttonStyle={sensorType === "vibration" ? "ACTIVE" : "SECONDARY"}
          icon={
            <Waves color={sensorType === "vibration" ? "#fff" : "#2188FF"} />
          }
          onClick={() => {
            sensorType === "vibration"
              ? setSensorType(null)
              : setSensorType("vibration");
          }}
        />
      </>
    );
  };

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

      <div className={styles.titleButtonContainer}>{renderButtons()}</div>
    </div>
  );
};
