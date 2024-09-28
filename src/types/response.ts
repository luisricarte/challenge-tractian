type Companies = {
  id: string;
  name: string;
};

type Locations = {
  id: string;
  name: string;
  parentId: string;
};

type Assets = {
  id: string;
  locationId: string;
  name: string;
  parentId?: string;
  sensorType?: string;
  status?: string;
};

export type { Companies, Locations, Assets };
