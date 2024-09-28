import React, { ReactChild } from "react";
import { HTMLButtonProps } from "../../types/html";
import styles from "./styles.module.css";

type ButtonTypes = "PRIMARY" | "SECONDARY" | "ACTIVE";

interface IButton extends HTMLButtonProps {
  name: string;
  buttonStyle?: ButtonTypes;
  icon?: ReactChild;
}

export const Button: React.FC<IButton> = ({
  name,
  buttonStyle = "PRIMARY",
  icon,
  ...rest
}) => {
  const getButtonClass = () => {
    switch (buttonStyle) {
      case "PRIMARY":
        return styles["button-primary"];
      case "SECONDARY":
        return styles["button-secondary"];
      case "ACTIVE":
        return styles["button-active"];
    }
  };

  return (
    <button className={getButtonClass()} {...rest}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {icon}
        <span style={{ fontFamily: "Inter", fontWeight: 600 }}>{name}</span>
      </div>
    </button>
  );
};
