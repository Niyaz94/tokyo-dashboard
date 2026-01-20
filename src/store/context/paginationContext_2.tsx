import { createContext, useContext, useEffect, useMemo, useState }  from "react";
import {SingleTaskUniqueInterface}    from 'src/utility/types/data_types';
import useFetch, {FetchData}          from '../../utility/customHook/useGetAPI';

const PaginationContext          = createContext(null);

export const PaginationProvider  = ({ 
  children,
  url,
  tableData=[], 
  secondaryData={},
  paginData={count: 0,next: null,previous: null},
  pageDefaultData={}
  
}) => {

  console.log("PaginationProvider Run")

  const { data,success}: FetchData<SingleTaskUniqueInterface> = useFetch <SingleTaskUniqueInterface>(url,{type:[]});


  useEffect(()=>{
    
    if(success)
        setSecondary(data)

  },[success])
  const [table, setTable]           = useState(tableData);
  const [secondary, setSecondary]   = useState(secondaryData);
  const [pagination, setPagination] = useState(paginData);
  const [pageDefault, setPageDefault] = useState(pageDefaultData);

  const contextValue=useMemo(()=>({ 
    table, setTable, secondary, setSecondary, pagination, setPagination,pageDefault, setPageDefault 
  }),[table, secondary, pagination,pageDefault ])

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