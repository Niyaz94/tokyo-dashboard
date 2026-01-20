import { createContext, useContext, useState }  from "react";



const AddEditContext          = createContext(null);
// const AddEditContext          = createContext<TaskStatusContextInterface | undefined>(undefined);
export const TaskStatusProvider  = ({ children,tableData, secondaryData}) => {

  const [table, setTable]         = useState(tableData || []);
  const [secondary, setSecondary] = useState(secondaryData || {tasks_name:[], task_status:[]});

  return (
    <AddEditContext value={{ table, setTable, secondary, setSecondary }}>
      {children}
    </AddEditContext>
  );
};
export const useTaskStatus = () => {
    const context = useContext(AddEditContext);
    if (!context) {
      throw new Error("TaskStatus must be used within an TaskStatusProvider");
    }
    return context;
};