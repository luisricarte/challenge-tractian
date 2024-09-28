import React from "react";
import { HTMLButtonProps } from "../../types/html";
import styles from "./styles.module.css";

type ButtonTypes = "PRIMARY" | "SECONDARY" | "ACTIVE";

interface IButton extends HTMLButtonProps {
  name: string;
  buttonStyle?: ButtonTypes;
}

export const Button: React.FC<IButton> = ({
  name,
  buttonStyle = "PRIMARY",
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
      <span style={{ fontFamily: "Inter", fontWeight: 600 }}>{name}</span>
    </button>
  );
};
