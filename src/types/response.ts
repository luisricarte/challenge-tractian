type Companies = {
  id: string;
  name: string;
};

type Locations = {
  id: string;
  name: string;
  parentId: string | null;
};

type Assets = {
  id: string;
  name: string;
  parentId: string | null;
  sensorId?: string | null;
  sensorType?: "vibration" | "energy" | null;
  status?: "operating" | "alert" | null;
  locationId?: string;
  gatewayId?: string;
};

interface TreeNode extends Assets {
  id: string;
  name: string;
  parentId: string | null;
  children?: TreeNode[];
}

export type { Companies, Locations, Assets, TreeNode };
