import { HTMLDivProps } from "../../types/html";

interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>OLÁ EU SOU A LEFT Side BAR</h1>
    </div>
  );
};
