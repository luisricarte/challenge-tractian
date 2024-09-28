import { ArrowBigDown, Shield } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import { Button } from "../button";
import styles from "./styles.module.css";
interface ITopBar extends HTMLDivProps {}

export const TopBar: React.FC<ITopBar> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="./images/tractian.svg" alt="TRACTIAN" />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          name={"Apex Unit"}
          buttonStyle="ACTIVE"
          icon={<ArrowBigDown />}
        />
        <Button name={"Tobias Unit"} buttonStyle="PRIMARY" icon={<Shield />} />
        <Button name={"Jaguar Unit"} buttonStyle="PRIMARY" icon={<Shield />} />
      </div>
    </div>
  );
};
