import { createContext, useContext, useMemo, useState }  from "react";

const PaginationContext          = createContext(null);

export const PaginationProvider  = ({ 
  children,
  tableData=[], 
  secondaryData={},
  paginData={count: 0,next: null,previous: null},
  pageDefaultData={}
}) => {
  const [table,       setTable]       = useState(tableData);
  const [useTableData,       setUseTableData]       = useState(true);
  const [secondary,   setSecondary]   = useState(secondaryData);
  const [pagination,  setPagination]  = useState(paginData);
  const [pageDefault, setPageDefault] = useState(pageDefaultData);

  const contextValue=useMemo(()=>({ 
    table, setTable, secondary, setSecondary, pagination, setPagination,pageDefault, setPageDefault ,useTableData,       setUseTableData
  }),[table, secondary, pagination,pageDefault ,useTableData])

  return (
    <PaginationContext value={contextValue}>
      {children}
    </PaginationContext>
  );
};
export const usePaginationContext = () => {
    const context = useContext(PaginationContext);
    if (!context) {
      throw new Error("The page must be used within an PaginationProvider");
    }
    return context;
};