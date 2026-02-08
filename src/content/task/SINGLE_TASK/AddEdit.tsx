import { useState,useMemo, useEffect } from 'react';
import { inputFields } from "./config";
import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import {SingleTaskFormIntialState}  from "../../../utility/function/defaultData"
import { SingleTaskFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';
import {StatusCase2 } from '../../../utility/function/data';
import { filterStatusOptions_2 as single_task_status } from '../../../utility/function/data';
// import {Socket} from '../../../utility/Socket';

const CollapsibleForm = () => {

  const  {secondary,setTable,setUseTableData}              = usePaginationContext();

  const {type:single_task_type } = secondary;
  const singleTaskPriority = StatusCase2.map(({value,label})=>({value:value.toLowerCase(),label}))

  const memSingleTaskPriority   = useMemo(() => singleTaskPriority, []);
  const memSingleTaskType       = useMemo(() => single_task_type, []);
  const memSingleTaskStatus     = useMemo(() => single_task_status, []);

  const [pageName,setPageName]  = useState<string>("single_task_added");
  const {
    formData,formErrors, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit,responseData
  } = useAddEditPage<SingleTaskFormStateInterface>({
      fetchUrl: (id) => `schedule/stask/${id}`,
      postUrl: "schedule/stask/",
      editUrl: (id) => `schedule/stask/${id}/`,
      initialState: SingleTaskFormIntialState,
      onSuccessRedirect: "/goals/single_task",
      page_name: pageName,
      setTable:setTable,
      setUseTableData:setUseTableData
  });
  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  // useEffect(() => {
  //   if(Object.keys(responseData || {}).length >0){
  //     if(isEdit){
  //       // console.log("Updating table with edited data-----", responseData);
  //       setTable((prev) => [{name:"nyaz",...responseData,id:1},...prev]);

  //       // setTable((prev) => prev.map((item: any) => item.id === responseData.id ? { ...responseData } : item));
  //     }else{
  //       setTable((prev) => [...prev, responseData]);
  //     }
  //   }
  // },[responseData])

  return (        
        <FormLayout
          title="Single Task Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          page_name={pageName}
          isEdit={isEdit}
          onSuccessRedirect="/goals/single_task"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          {inputFields({memSingleTaskStatus,memSingleTaskPriority,memSingleTaskType}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default CollapsibleForm;