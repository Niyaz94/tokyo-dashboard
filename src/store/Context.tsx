import { createContext, useContext, useState } from "react";


export const ExploreAction = createContext(null as any);



const AddEditContext = createContext(null as any);

export const AddEditProvider = ({ children,initialData }) => {
  const [addEditData, setAddEditData] = useState(initialData || {});

  return (
    <AddEditContext.Provider value={{ addEditData, setAddEditData }}>
      {children}
    </AddEditContext.Provider>
  );
};
// export const useAddEdit = () => useContext(AddEditContext);
export const useAddEdit = () => {
    const context = useContext(AddEditContext);
    if (!context) {
      throw new Error("useAddEdit must be used within an AddEditProvider");
    }
    return context;
};

//you can use this in any component to update the value
// const { setAddEditData } = useAddEdit();
// setAddEditData({ ...value});
