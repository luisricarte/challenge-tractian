import React from "react";
import { HTMLButtonProps } from "../../types/html";

type ButtonTypes = "PRIMARY" | "SECONDARY" | "ACTIVE";

interface IButton extends HTMLButtonProps {
  name: string;
  types?: ButtonTypes;
}

export const Button: React.FC<IButton> = ({ name, types }) => {
  return <button>{name}</button>;
};
