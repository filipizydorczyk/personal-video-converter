import { createContext, FC, ReactNode, useContext, useState } from 'react';

type ContextValue = {
  path: string | null;
  setPath: React.Dispatch<React.SetStateAction<string | null>>;
};

const VaultContext = createContext<ContextValue>({
  path: null,
  setPath: () => {},
});

const VaultProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string | null>(null);
  return (
    <VaultContext.Provider value={{ path, setPath }}>
      {children}
    </VaultContext.Provider>
  );
};

const useVaultContext = () => useContext(VaultContext);

export { VaultProvider, useVaultContext };
