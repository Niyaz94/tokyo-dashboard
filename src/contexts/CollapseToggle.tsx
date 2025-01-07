import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CollapseContextProps {
  open: boolean;
  toggleOpen: () => void;
}

const CollapseContext = createContext<CollapseContextProps | undefined>(undefined);


export const CollapseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <CollapseContext.Provider value={{ open, toggleOpen }}>
      {children}
    </CollapseContext.Provider>
  );
};

export const useCollapseContext = (): CollapseContextProps => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error('useCollapseContext must be used within a CollapseProvider');
  }
  return context;
};