import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";

type FilterStatusContextProps = {
  status: string | null;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterStatusContext = createContext<FilterStatusContextProps | undefined>(
  {} as FilterStatusContextProps
);

interface FilterStatusProviderProps {
  children: ReactNode;
}

export const FilterStatusProvider: React.FC<FilterStatusProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      status,
      setStatus,
    }),
    [status]
  );

  return (
    <FilterStatusContext.Provider value={value}>
      {children}
    </FilterStatusContext.Provider>
  );
};

export const useFilterStatusContext = () => {
  const context = useContext(FilterStatusContext);
  if (!context) {
    throw new Error(
      "useFilterStatusContext deve ser usado dentro de um FilterStatusProvider"
    );
  }
  return context;
};
