import { BaggageClaim, Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
import { useQuery } from "react-query";
import { reactQueryKeys } from "../../constants/react-query-keys";
import { companiesService } from "../../services/companies";
import { Accordion } from "../accordion";
import { ReactNode, useState } from "react";
import { Assets, Locations } from "../../types/response";

interface ILeftSideBar extends HTMLDivProps {}
interface Node {
  id: string;
  name: string;
  parentId: string | null;
  children?: Node[];
}

//eu recebo location data do contexto!

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  const [tree, setTree] = useState<Node[]>([]);

  const { data: assetsData, isLoading: assetsLoading } = useQuery({
    queryKey: reactQueryKeys.queries.findAllAssets,
    queryFn: () => {
      if (locationData) {
        companiesService
          .findAllAssets("662fd0ee639069143a8fc387")
          .then((data) => {
            buildAssetsTree(tree);
          });
      }
    },
  });

  const { data: locationData, isLoading: locationLoading } = useQuery({
    queryKey: reactQueryKeys.queries.findAllLocation,
    queryFn: async () => {
      return await companiesService
        .findAllLocations("662fd0ee639069143a8fc387")
        .then((data) => buildLocation(data));
    },
  });

  if (!locationLoading) {
    console.log("location data", locationData);
  }

  const buildAssetsTree = (data: Assets[]) => {
    const starterTree = tree;
  };

  const buildLocation = (data: Locations[]): Node[] => {
    const nodes: { [key: string]: Node } = {};
    const buildingTree = [] as Node[];

    data.forEach((item) => {
      nodes[item.id] = { ...item, children: [] };
    });

    data.forEach((item) => {
      if (item.parentId === null) {
        buildingTree.push(nodes[item.id]);
      } else {
        const parent = nodes[item.parentId];
        if (parent) {
          parent.children?.push(nodes[item.id]);
        }
      }
    });

    return buildingTree;
  };

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
      {locationData && assetsData ? "" : ""}
      <div style={{ display: "flex", flexDirection: "column", margin: "2%" }}>
        <Accordion icon={<BaggageClaim />} text={"etste".toUpperCase()}>
          <div style={{ marginLeft: "10%" }}>estou sendo exibido!</div>
          <Accordion
            icon={<BaggageClaim />}
            text={"teste-interno".toUpperCase()}
          >
            exibido interno
          </Accordion>
        </Accordion>
      </div>
    </div>
  );
};
