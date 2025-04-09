import { createContext, useContext, useState }  from "react";



const AddEditContext          = createContext(null);
// const AddEditContext          = createContext<TaskStatusContextInterface | undefined>(undefined);
export const ActivityProvider  = ({ children,tableData}) => {

  const [table, setTable]         = useState(tableData || []);

  return (
    <AddEditContext.Provider value={{ table, setTable }}>
      {children}
    </AddEditContext.Provider>
  );
};
export const useActivity = () => {
    const context = useContext(AddEditContext);
    if (!context) {
      throw new Error("TaskStatus must be used within an TaskStatusProvider");
    }
    return context;
};