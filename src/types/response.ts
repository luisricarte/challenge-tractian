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

export type { Companies, Locations, Assets };
