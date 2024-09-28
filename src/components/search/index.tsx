import { HTMLDivProps } from "../../types/html";

interface ISearchBar extends HTMLDivProps {}

export const SearchBar: React.FC<ISearchBar> = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>OLÁ EU SOU A Search BAR</h1>
    </div>
  );
};
