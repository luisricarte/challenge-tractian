import React from "react";
import { ReactNode, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./styles.module.css";

type AccordionProps = {
  icon: string;
  text: string;
  children?: ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  icon,
  text,
  children,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
        <span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>

        <img src={`./images/${icon}.svg`} alt="" />
        <span>{text}</span>
      </div>
      {isOpen && <>{children}</>}
    </>
  );
};
