import { HTMLDivProps } from "../../types/html";

interface IRightSideBar extends HTMLDivProps {}

export const RightSideBar: React.FC<IRightSideBar> = () => {
  return (
    <div style={{ border: "1px solid blue", width: "62.5%" }}>
      <h1>OLÁ EU SOU A Right Side BAR</h1>
    </div>
  );
};
