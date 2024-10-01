import { Search } from "lucide-react";
import { HTMLDivProps } from "../../types/html";
import style from "./styles.module.css";
import { companiesService } from "../../services/companies";
import { Accordion } from "../accordion";
import { Assets, Locations, TreeNode } from "../../types/response";
import { MenuItem } from "../menuItem";
import { useState, useMemo } from "react";
import { useFilterSensorContext } from "../../contexts/FilterSensorContext";
import { useQuery } from "react-query";
import { reactQueryKeys } from "../../constants/react-query-keys";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { useFilterStatusContext } from "../../contexts/FilterStatusContext";

interface ILeftSideBar extends HTMLDivProps {}

export const LeftSideBar: React.FC<ILeftSideBar> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { sensorType } = useFilterSensorContext();
  const { status } = useFilterStatusContext();
  const { companyId } = useCompanyContext();

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

  const { data: locationsData, isLoading: isLoadingLocations } = useQuery({
    queryKey: [`${reactQueryKeys.queries.findAllLocation}-${companyId}`],
    queryFn: () => companiesService.findAllLocations(companyId),
    enabled: !!companyId,
  });

  const { data: assetsData, isLoading: isLoadingAssets } = useQuery({
    queryKey: [`${reactQueryKeys.queries.findAllAssets}-${companyId}`],
    queryFn: () => companiesService.findAllAssets(companyId),
    enabled: !!locationsData,
  });

  const finalData = useMemo(() => {
    if (locationsData && assetsData) {
      const tree = buildLocationTree(locationsData);
      return buildAssetsTree(tree, assetsData);
    }
    return null;
  }, [assetsData]);

  const filterTree = (
    tree: TreeNode[],
    term: string,
    sensorType: string | null,
    status: string | null
  ): TreeNode[] => {
    return tree
      .map((node) => {
        const matchesTerm = node.name
          .toLowerCase()
          .includes(term.toLowerCase());

        const matchesSensorType =
          sensorType === null ||
          (node.sensorType && node.sensorType === sensorType);

        const matchesStatus =
          status === null || (status === "alert" && node.status === "alert");

        if (matchesTerm && matchesSensorType && matchesStatus) {
          return node;
        }

        if (node.children) {
          const filteredChildren = filterTree(
            node.children,
            term,
            sensorType,
            status
          );
          if (filteredChildren.length > 0) {
            return { ...node, children: filteredChildren };
          }
        }
        return null;
      })
      .filter((node) => node !== null) as TreeNode[];
  };

  const filteredData = useMemo(() => {
    if (!finalData) return null;
    return filterTree(finalData, searchTerm, sensorType, status);
  }, [searchTerm, finalData, sensorType, status]);

  const isLoading = isLoadingLocations || isLoadingAssets;

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
        {isLoading ? (
          <>Carregando...</>
        ) : (
          filteredData && renderMenuItems(filteredData)
        )}
      </div>
    </div>
  );
};
