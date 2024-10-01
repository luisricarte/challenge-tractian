import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";

type CompanyContextProps = {
  companyId: string;
  setCompanyId: React.Dispatch<React.SetStateAction<string>>;
};

const CompanyContext = createContext<CompanyContextProps | undefined>(
  {} as CompanyContextProps
);

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const [companyId, setCompanyId] = useState<string>(
    "662fd0ee639069143a8fc387"
  );

  const value = useMemo(
    () => ({
      companyId,
      setCompanyId,
    }),
    [companyId]
  );

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error(
      "useCompanyContext deve ser usado dentro de um CompanyProvider"
    );
  }
  return context;
};
