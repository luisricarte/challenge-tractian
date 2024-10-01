import { ArrowBigDown, Shield } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import { Button } from "../button";
import styles from "./styles.module.css";
import { useCompanyContext } from "../../contexts/CompanyContext";
interface ITopBar extends HTMLDivProps {}

export const TopBar: React.FC<ITopBar> = () => {
  const { companyId, setCompanyId } = useCompanyContext();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="./images/tractian.svg" alt="TRACTIAN" />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          name={"Apex Unit"}
          buttonStyle={
            companyId === "662fd100f990557384756e58" ? "ACTIVE" : "PRIMARY"
          }
          icon={<ArrowBigDown />}
          onClick={() => {
            setCompanyId("662fd100f990557384756e58");
          }}
        />
        <Button
          name={"Tobias Unit"}
          buttonStyle={
            companyId === "662fd0fab3fd5656edb39af5" ? "ACTIVE" : "PRIMARY"
          }
          icon={<Shield />}
          onClick={() => {
            setCompanyId("662fd0fab3fd5656edb39af5");
          }}
        />
        <Button
          name={"Jaguar Unit"}
          buttonStyle={
            companyId === "662fd0ee639069143a8fc387" ? "ACTIVE" : "PRIMARY"
          }
          icon={<Shield />}
          onClick={() => {
            setCompanyId("662fd0ee639069143a8fc387");
          }}
        />
      </div>
    </div>
  );
};
