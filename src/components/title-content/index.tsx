import React, { useEffect } from "react";
import styles from "./style.module.css";
import { Button } from "../button";
import { AlertCircle, Waves, Zap } from "lucide-react";
import { useFilterSensorContext } from "../../contexts/FilterSensorContext";
import { useFilterStatusContext } from "../../contexts/FilterStatusContext";

export const TitleContent = () => {
  const { sensorType, setSensorType } = useFilterSensorContext();
  const { status, setStatus } = useFilterStatusContext();

  useEffect(() => {
    renderSensorFilterButtons();
  }, [sensorType]);

  useEffect(() => {
    renderAlertButtons();
  }, [status]);

  const renderSensorFilterButtons = () => {
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

  const renderAlertButtons = () => {
    return (
      <Button
        name={"Crítico"}
        buttonStyle={status === "alert" ? "ACTIVE" : "SECONDARY"}
        icon={<AlertCircle color={status === "alert" ? "#fff" : "#2188FF"} />}
        onClick={() =>
          status === "alert" ? setStatus(null) : setStatus("alert")
        }
      />
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

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <div className={styles.titleButtonContainer}>
          <strong style={{ color: "#77818C" }}>Filtro (sensor type)</strong>
          {renderSensorFilterButtons()}
        </div>
        <div className={styles.titleButtonContainer}>
          <strong style={{ color: "#77818C" }}>Filtro (status)</strong>
          {renderAlertButtons()}
        </div>
      </div>
    </div>
  );
};
