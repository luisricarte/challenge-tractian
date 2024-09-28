import { Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <input
          id="search-bar"
          placeholder="Buscar ativo ou Local"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <Search size={18} />
      </div>

      <div id="content-search "></div>
    </div>
  );
};
