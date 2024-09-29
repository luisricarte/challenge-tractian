import { BaggageClaim, Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
import { useQuery } from "react-query";
import { reactQueryKeys } from "../../constants/react-query-keys";
import { companiesService } from "../../services/companies";
import { Accordion } from "../accordion";
import { Assets, Locations, TreeNode } from "../../types/response";
import { MenuItem } from "../menuItem";

interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  const { data: locationData, isLoading: locationLoading } = useQuery({
    queryKey: reactQueryKeys.queries.findAllLocation,
    queryFn: async () => {
      const data = await companiesService.findAllLocations(
        "662fd0ee639069143a8fc387"
      );
      return buildLocationTree(data);
    },
  });

  const { data: finalData, isLoading: assetsLoading } = useQuery({
    queryKey: reactQueryKeys.queries.findAllAssets,
    queryFn: async () => {
      const data = await companiesService.findAllAssets(
        "662fd0ee639069143a8fc387"
      );
      if (locationData) return buildAssetsTree(locationData, data);
    },
    enabled: !!locationData,
  });

  const buildLocationTree = (data: Locations[]): TreeNode[] => {
    const nodes: { [key: string]: TreeNode } = {};
    const buildingTree = [] as TreeNode[];

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

  const buildAssetsTree = (locationsTree: TreeNode[], assetsData: Assets[]) => {
    const assets: { [key: string]: TreeNode } = {};

    assetsData.forEach((item, i) => {
      if (assetsData[i].sensorType != null) {
        assets[item.id] = { ...item, children: [] };
      }
      assets[item.id] = { ...item, children: [] };
    });

    assetsData.forEach((item, i) => {
      if (item.sensorType != null) {
        if (item.locationId === null && item.parentId === null) {
          console.log("adicionei");
          locationsTree.push(assets[item.id]);
        } else if (item.locationId != null) {
          console.log("adicionei1");
          const parentLocation = findNodeById(locationsTree, item.locationId);
          parentLocation?.children?.push(assets[item.id]);
        } else if (item.parentId != null) {
          console.log("adicionei1");
          const parentAsset = assets[item.parentId];
          parentAsset?.children?.push(assets[item.id]);
        }
      } else {
        if (item.locationId != null) {
          const parentLocation = findNodeById(locationsTree, item.locationId);
          parentLocation?.children?.push(assets[item.id]);
        } else if (item.parentId != null) {
          const parentAsset = assets[item.parentId];
          parentAsset?.children?.push(assets[item.id]);
        }
      }
    });

    console.log("locations tree final", locationsTree);
    return locationsTree;
  };

  function findNodeById(tree: TreeNode[], id: string): TreeNode | undefined {
    for (const node of tree) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  const renderMenuItems = (arvore: TreeNode[]) => {
    return arvore.map((item, index) => {
      return item.sensorType != null ? (
        <div style={{ paddingLeft: "3%", margin: "0.5rem" }}>
          <MenuItem {...item} />
        </div>
      ) : (
        <div style={{ paddingLeft: "3%" }}>
          <Accordion
            icon={<BaggageClaim />}
            text={item.name}
            key={`item-accordion-${index}-${item.id}`}
          >
            {item.children && renderMenuItems(item.children)}
          </Accordion>
        </div>
      );
    });
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

      <div style={{ display: "flex", flexDirection: "column", margin: "2%" }}>
        {finalData ? <>{renderMenuItems(finalData)}</> : <>carregando</>}
      </div>
    </div>
  );
};
