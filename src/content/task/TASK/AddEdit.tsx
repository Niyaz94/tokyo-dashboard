import { useState,useMemo } from 'react';
import {TaskFormIntialState}  from "../../../utility/function/defaultData"
import { TaskFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';


import {createSelectMap}          from '../../../utility/function/main';
import { inputFields }            from "./config";
import { useAddEditPage}          from "../../../utility/customHook";
import {FormLayout,FieldRenderer} from '../../../components/Form';

const CollapsibleForm = () => {

    const  {secondary,table,setTable,pageDefault}              = usePaginationContext();
    const { status:task_status,priority:single_task_priority,type:single_task_type } = secondary;
    const taskStatus        = createSelectMap(task_status,"type3")
    const memTaskStatus     = useMemo(() => taskStatus, []);

    const [pageName,setPageName] = useState<string>("task_added");
  
    const {
      formData,formErrors, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit
    } = useAddEditPage<TaskFormStateInterface>({
      fetchUrl: (id) => `schedule/task/${id}`,
      postUrl: "schedule/task/",
      editUrl: (id) => `schedule/task/${id}/`,
      initialState: TaskFormIntialState,
      onSuccessRedirect: "/goals/task",
      page_name: pageName
    });


  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  return (        
        <FormLayout
          title="Single Task Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          page_name={pageName}
          isEdit={isEdit}
          onSuccessRedirect="/goals/task"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          {inputFields({memTaskStatus}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            // console.log("Inside FieldRenderer:",field, i)
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default CollapsibleForm;