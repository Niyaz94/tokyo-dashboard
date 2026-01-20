import { createContext, useContext, useState }  from "react";



const PageContext          = createContext(null);
// const AddEditContext          = createContext<TaskStatusContextInterface | undefined>(undefined);


export const PageProvider  = ({ children,tableData,secondaryData={},pageDefaultData={}}) => {

  const [table, setTable]             = useState(tableData || []);
  const [pageDefault, setPageDefault] = useState(pageDefaultData);
  const [secondary, setSecondary]     = useState(secondaryData);


  return (
    <PageContext value={{ table, setTable, secondary, setSecondary,pageDefault, setPageDefault }}>
      {children}
    </PageContext>
  );
};
export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
      throw new Error("TaskStatus must be used within an TaskStatusProvider");
    }
    return context;
};