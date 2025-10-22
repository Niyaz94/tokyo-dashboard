import { createContext, useContext, useState }  from "react";

const PaginationContext          = createContext(null);

export const PaginationProvider  = ({ children,tableData, secondaryData,paginData,pageDefaultData={}}) => {

  const [table, setTable]           = useState(tableData || []);
  const [secondary, setSecondary]   = useState(secondaryData || {});
  const [pagination, setPagination] = useState(paginData || {count: 0,next: null,previous: null});
  const [pageDefault, setPageDefault] = useState(pageDefaultData);


  return (
    <PaginationContext.Provider value={{ table, setTable, secondary, setSecondary, pagination, setPagination,pageDefault, setPageDefault }}>
      {children}
    </PaginationContext.Provider>
  );
};
export const usePaginationContext = () => {
    const context = useContext(PaginationContext);
    if (!context) {
      throw new Error("The page must be used within an PaginationProvider");
    }
    return context;
};