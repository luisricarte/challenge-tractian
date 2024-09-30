import { Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
import { companiesService } from "../../services/companies";
import { Accordion } from "../accordion";
import { Assets, Locations, TreeNode } from "../../types/response";
import { MenuItem } from "../menuItem";
import { useState, useEffect, useMemo, useCallback } from "react";

interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  const [locationData, setLocationData] = useState<TreeNode[] | null>(null);
  const [loadingLocations, setLoadingLocations] = useState<boolean>(true);

  const [finalData, setFinalData] = useState<TreeNode[] | null>(null);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(false);

  const [filteredData, setFilteredData] = useState<TreeNode[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoadingLocations(true);
        const data = await companiesService.findAllLocations(
          "662fd0ee639069143a8fc387"
        );
        const tree = buildLocationTree(data);
        setLocationData(tree);
      } catch (error) {
        console.error("Erro ao buscar localizações", error);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    finalData && searchTerm
      ? setFilteredData(filterTree(finalData, searchTerm))
      : setFilteredData(finalData);
  }, [searchTerm, finalData]);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!locationData) return;

      try {
        setLoadingAssets(true);
        const assetsData = await companiesService.findAllAssets(
          "662fd0ee639069143a8fc387"
        );
        const treeWithAssets = buildAssetsTree(locationData, assetsData);

        setFilteredData(treeWithAssets);
        setFinalData(treeWithAssets);
      } catch (error) {
        console.error("Erro ao buscar assets", error);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchAssets();
  }, [locationData]);

  const buildLocationTree = (data: Locations[]): TreeNode[] => {
    const nodes: { [key: string]: TreeNode } = {};
    const buildingTree = [] as TreeNode[];

    data.forEach((item) => {
      nodes[item.id] = { ...item, children: [], nodeType: "location" };
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

    assetsData.forEach((item) => {
      assets[item.id] = { ...item, children: [] };
    });

    assetsData.forEach((item) => {
      if (item.sensorType != null) {
        if (item.locationId === null && item.parentId === null) {
          locationsTree.push(assets[item.id]);
        } else if (item.locationId != null) {
          const parentLocation = findNodeById(locationsTree, item.locationId);
          parentLocation?.children?.push(assets[item.id]);
        } else if (item.parentId != null) {
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

    return locationsTree;
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

  const filterTree = useCallback(
    (tree: TreeNode[], term: string): TreeNode[] => {
      return tree
        .map((node) => {
          if (node.name.toLowerCase().includes(term.toLowerCase())) {
            return node;
          }
          if (node.children) {
            const filteredChildren = filterTree(node.children, term);
            if (filteredChildren.length > 0) {
              return { ...node, children: filteredChildren };
            }
          }
          return null;
        })
        .filter((node) => node !== null) as TreeNode[];
    },
    []
  );

  const renderMenuItems = (arvore: TreeNode[]) => {
    return arvore.map((item, index) => {
      return item.sensorType != null ? (
        <div style={{ paddingLeft: "3%", margin: "0.5rem" }} key={item.id}>
          <MenuItem {...item} />
        </div>
      ) : (
        <div style={{ paddingLeft: "3%" }} key={item.id}>
          <Accordion
            icon={item.nodeType === "location" ? "location" : "asset"}
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
    return filteredData && renderMenuItems(filteredData);
  }, [filteredData]);

  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <input
          id="search-bar"
          placeholder="Buscar ativo ou Local"
          style={{ fontSize: "18px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={18} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {loadingLocations || loadingAssets ? <>carregando</> : menuItems}
      </div>
    </div>
  );
};
