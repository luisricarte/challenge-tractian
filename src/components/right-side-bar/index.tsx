import { HTMLDivProps } from "../../types/html";
import { useActiveAssetContext } from "../../contexts/ActiveAssetContext";
import style from "./styles.module.css";
import { Inbox } from "lucide-react";

interface IRightSideBar extends HTMLDivProps {}

export const RightSideBar: React.FC<IRightSideBar> = () => {
  const { name, sensorType, status } = useActiveAssetContext();

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <strong className={style.title}>{name}</strong>
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
              <span>{sensorType}</span>
            </div>
            <div className={style.divider}></div>
            <div className={style.itemContainer}>
              <strong>Responsáveis</strong>
              <span>{status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
