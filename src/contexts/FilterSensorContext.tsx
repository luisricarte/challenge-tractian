import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";

type FilterSensorContextProps = {
  sensorType: string | null;
  setSensorType: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterSensorContext = createContext<FilterSensorContextProps | undefined>(
  {} as FilterSensorContextProps
);

interface FilterSensorProviderProps {
  children: ReactNode;
}

export const FilterSensorProvider: React.FC<FilterSensorProviderProps> = ({
  children,
}) => {
  const [sensorType, setSensorType] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      sensorType,
      setSensorType,
    }),
    [sensorType]
  );

  return (
    <FilterSensorContext.Provider value={value}>
      {children}
    </FilterSensorContext.Provider>
  );
};

export const useFilterSensorContext = () => {
  const context = useContext(FilterSensorContext);
  if (!context) {
    throw new Error(
      "useFilterSensorContext deve ser usado dentro de um FilterSensorProvider"
    );
  }
  return context;
};
