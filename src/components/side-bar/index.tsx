import { HTMLDivProps } from "../../types/html";

interface ISideBar extends HTMLDivProps {}

export const SideBar: React.FC<ISideBar> = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>OLÁ EU SOU A Side BAR</h1>
    </div>
  );
};
