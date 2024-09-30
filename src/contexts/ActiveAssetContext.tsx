import { createContext, useState, useContext, useMemo } from "react";

type ActiveAssetType = {
  sensorType: string | null;
  setSensorType: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  status: string | null;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  gateway: string | null;
  setGateway: React.Dispatch<React.SetStateAction<string>>;
};

interface ActiveAssetProviderProps {
  children: React.ReactNode;
}

const ActiveAssetContext = createContext<ActiveAssetType>(
  {} as ActiveAssetType
);

export const ActiveAssetProvider: React.FC<ActiveAssetProviderProps> = ({
  children,
}: ActiveAssetProviderProps) => {
  const [sensorType, setSensorType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [gateway, setGateway] = useState<string>("");

  const value = useMemo(
    () => ({
      sensorType,
      setSensorType,
      name,
      setName,
      status,
      setStatus,
      gateway,
      setGateway,
    }),
    [sensorType, name, status, gateway]
  );

  return (
    <ActiveAssetContext.Provider value={value}>
      {children}
    </ActiveAssetContext.Provider>
  );
};

export const useActiveAssetContext = () => {
  const context = useContext(ActiveAssetContext);
  if (!context) {
    throw new Error(
      "useActiveAssetContext deve ser usado dentro do AcetiveAssetContext"
    );
  }
  return context;
};
