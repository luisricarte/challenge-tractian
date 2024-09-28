import { HTMLDivProps } from "../../types/html";

interface ITopBar extends HTMLDivProps {}

export const TopBar: React.FC<ITopBar> = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>OLÁ EU SOU A TOP BAR</h1>
    </div>
  );
};
