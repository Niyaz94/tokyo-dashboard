import { createContext, useContext, useState }  from "react";



const PageContext          = createContext(null);
// const AddEditContext          = createContext<TaskStatusContextInterface | undefined>(undefined);


export const PageProvider  = ({ children,tableData,pageDefaultData={}}) => {

  const [table, setTable]             = useState(tableData || []);
  const [pageDefault, setPageDefault] = useState(pageDefaultData);

  return (
    <PageContext.Provider value={{ table, setTable, pageDefault, setPageDefault }}>
      {children}
    </PageContext.Provider>
  );
};
export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
      throw new Error("TaskStatus must be used within an TaskStatusProvider");
    }
    return context;
};