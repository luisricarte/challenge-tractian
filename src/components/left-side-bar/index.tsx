import { Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
import { useQuery } from "react-query";
import { reactQueryKeys } from "../../constants/react-query-keys";
import { companiesService } from "../../services/companies";

interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  const { data: companiesData } = useQuery({
    queryKey: reactQueryKeys.queries.findAllCompanies,
    queryFn: () => {
      companiesService
        .findAllCompanies()
        .then((data) => data)
        .then((data) => console.log("find all companies", data));
    },
  });

  const { data: locationData } = useQuery({
    queryKey: reactQueryKeys.queries.findAllLocation,
    queryFn: () => {
      companiesService
        .findAllLocations("662fd0ee639069143a8fc387")
        .then((data) => data)
        .then((data) => console.log("find all locations", data));
    },
  });

  const { data: assetsData } = useQuery({
    queryKey: reactQueryKeys.queries.findAllAssets,
    queryFn: () => {
      companiesService
        .findAllAssets("662fd0ee639069143a8fc387")
        .then((data) => data)
        .then((data) => console.log("find all assets", data));
    },
  });

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
