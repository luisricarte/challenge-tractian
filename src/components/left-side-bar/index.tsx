import { BaggageClaim, Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
import { useQuery } from "react-query";
import { reactQueryKeys } from "../../constants/react-query-keys";
import { companiesService } from "../../services/companies";
import { Accordion } from "../accordion";
import { Assets, Locations, TreeNode } from "../../types/response";
import { MenuItem } from "../menuItem";
import { useMemo } from "react";

interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  const { data: locationData } = useQuery({
    queryKey: reactQueryKeys.queries.findAllLocation,
    queryFn: async () => {
      const data = await companiesService.findAllLocations(
        "662fd0ee639069143a8fc387"
      );
      return buildLocationTree(data);
    },
  });

  const { data: finalData } = useQuery({
    queryKey: reactQueryKeys.queries.findAllAssets,
    queryFn: async () => {
      const data = await companiesService.findAllAssets(
        "662fd0ee639069143a8fc387"
      );
      if (locationData) return buildAssetsTree(locationData, data);
    },
    enabled: !!locationData,
  });

  const renderMenuItems = (arvore: TreeNode[]) => {
    return arvore.map((item, index) => {
      return item.sensorType != null ? (
        <div style={{ paddingLeft: "3%", margin: "0.25rem" }}>
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

  const menuItems = useMemo(() => {
    return finalData ? renderMenuItems(finalData) : null;
  }, [finalData]);

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

    const clonedTree = [...locationsTree];

    assetsData.forEach((item, i) => {
      if (assetsData[i].sensorType != null) {
        assets[item.id] = { ...item, children: [] };
      }
      assets[item.id] = { ...item, children: [] };
    });
    assetsData.forEach((item) => {
      if (item.sensorType != null) {
        if (item.locationId === null && item.parentId === null) {
          clonedTree.push(assets[item.id]);
        } else if (item.locationId != null) {
          const parentLocation = findNodeById(clonedTree, item.locationId);
          parentLocation?.children?.push(assets[item.id]);
        } else if (item.parentId != null) {
          const parentAsset = assets[item.parentId];
          parentAsset?.children?.push(assets[item.id]);
        }
      } else {
        if (item.locationId != null) {
          const parentLocation = findNodeById(clonedTree, item.locationId);
          parentLocation?.children?.push(assets[item.id]);
        } else if (item.parentId != null) {
          const parentAsset = assets[item.parentId];
          parentAsset?.children?.push(assets[item.id]);
        }
      }
    });

    return clonedTree;
  };

  const findNodeById = (tree: TreeNode[], id: string): TreeNode | undefined => {
    for (const node of tree) {
      if (node.id === id) {
        return node;
      }
      const found = node.children && findNodeById(node.children, id);
      if (found) return found;
    }
    return undefined;
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

      <div style={{ display: "flex", flexDirection: "column" }}>
        {finalData ? menuItems : <>carregando</>}
      </div>
    </div>
  );
};
