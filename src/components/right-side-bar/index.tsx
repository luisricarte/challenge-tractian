import { HTMLDivProps } from "../../types/html";
import { useActiveAssetContext } from "../../contexts/ActiveAssetContext";
import style from "./styles.module.css";
import { Inbox } from "lucide-react";

interface IRightSideBar extends HTMLDivProps {}

export const RightSideBar: React.FC<IRightSideBar> = () => {
  const { name, sensorType, gateway, status } = useActiveAssetContext();

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <strong className={style.title}>MOTOR RT COAL AF01</strong>
      </div>

      <div className={style.contextContainer}>
        <div style={{ display: "flex", gap: "2rem", flexDirection: "row" }}>
          <div className={style.imageContainer}>
            <Inbox size={32} color="#55a6ff" />
            <span style={{ color: "#55a6ff" }}>Adicionar imagem do ativo</span>
          </div>
          <div className={style.typeRespContainer}>
            <div className={style.itemContainer}>
              <strong>Tipo de Equipamento</strong>
              <span>Motor Elétrico (Trifásico) </span>
            </div>
            <div className={style.divider}></div>
            <div className={style.itemContainer}>
              <strong>Responsáveis</strong>
              <span>Mecânica</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div
style={{
  width: "100%",
  height: "1px",
  backgroundColor: "#E3EAEF",
}}
></div> */
}

{
  /* <div id="sensor-receptor">
          <div id="sensor">
            <strong>Sensor</strong>
            <span>H123141</span>
          </div>
          <div id="receptor">
            <strong>Receptor</strong>
            <span>{gateway}</span>
          </div>
        </div> */
}
