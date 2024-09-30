import React from "react";
import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionProps = {
  icon: ReactNode | string;
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
    <div className={styles.accordionItem}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
        <span>
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>

        <span>{icon}</span>
        <span className={styles.text}>{text}</span>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
