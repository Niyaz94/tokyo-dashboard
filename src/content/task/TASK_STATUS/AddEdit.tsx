import { 
  usePostAPI, useEditAPI, useFetch, FetchData , useSnackbar
}         from "../../../utility/customHook";

import { useState,useEffect,useCallback,useMemo, useRef } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams,useLocation }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import {MultiButton,CustomSnackbar,CustomSwitch,CustomDatePicker}                  from "../../../components/Form"
import {TaskStatusFormIntialState}  from "../../../utility/function/defaultData"

import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';

import { TaskStatusFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';

import {TaskStatusRowSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
import dayjs                           from "dayjs";
import {TaskStatusStatus} from '../../../utility/function/data';



const CollapsibleForm = () => {

  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();
  const {secondary,setTable}              = usePaginationContext();
  const {task_type}  = secondary;

  const mem_task_name_map     = useMemo(() => task_type.filter(({status})=>status=="active"), []);

  const importanceLevel = Array.from({length: 6}, (x, i) => i).map((value)=>({value,label:`Level ${value}`})) 
  const navigate                = useNavigate();

  const {id:edit_page_id} = useParams<{ id?: string;}>();
  const { state } = useLocation();


  const ids = state?.ids && edit_page_id==="0" ? state.ids :[];


  const isFirstRender = useRef(true);
  const [formData, setFormData] = useState(TaskStatusFormIntialState);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<TaskStatusFormStateInterface>  = useFetch <TaskStatusFormStateInterface>(edit_page_id && edit_page_id!="0"?`schedule/task_status/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const [pageReDirect, setPageRedirect] = useState(false);
  
  const saveReturn=()=>{
    setPageRedirect(true);
    handleSave()
  }
  const saveContinue=()=>{
    setPageRedirect(false);
    handleSave()
  }

  useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false; // skip the first run
        return;
      }
      const postSuccess = response?.success;
      const editSuccess = editResponse?.success;
  
      if (postSuccess && response?.data) {
        setTable(prev => [...response.data, ...prev]);
      }
  
      if (editSuccess && editResponse?.data) {
        setTable(prev => prev.map((item: SingleSampleInterface) =>
          item.id === editResponse.data.id ? editResponse.data : item
        ));
      }
      try {
        // const errorMessage = post_api_error || editError;
        const errorMessage = post_api_error.message || editError.message;

        const success = postSuccess || editSuccess;
        const successMessage = postSuccess ? 'Submitted successfully!' : editSuccess ? 'Edited successfully!' : null;
  
        if (success) {
          showSnackbar(successMessage, 'success');
          setTimeout(() => {if(pageReDirect) navigate('/goals/task_progress');}, 1000); 
        } else 
          showSnackbar(errorMessage, 'error');
      } catch (error) {
        showSnackbar('Network error. Please try again.', 'error');
      } 
  }, [response,editResponse]);


  useEffect(() => {
    if (Object.keys(fetchEditData).length > 0) {
      setFormData({...fetchEditData});
    }
  }, [fetchEditData]);

  const handleFormChange = useCallback((key, value) => {
    if (key === 'date') {
      value = dayjs(value).format('YYYY-MM-DD');
    }
    setFormData((prev) => ({...prev,[key]: value}));
  },[]);
  
  const handleSave = async () => {
    const { id, ...dataToBeSent } = formData; // Destructure once

    if(ids.length>0){
      for(const [key,value] of Object.entries(formData)){
        if(key==="note"){

          const note=JSON.parse(value as string)?.root?.children?.[0]?.children ??[];
          if(note.length==0)
            delete dataToBeSent[key as keyof TaskStatusFormStateInterface];
        }else if(value===TaskStatusFormIntialState[key as keyof TaskStatusFormStateInterface]){
          delete dataToBeSent[key as keyof TaskStatusFormStateInterface];
        }
      }

      if(Object.keys(dataToBeSent).length>0){
        dataToBeSent["ids"]= ids;
        await editData("schedule/task_status/bulk-update/", dataToBeSent);
      }
      
    }else if(edit_page_id) {
      await editData(`schedule/task_status/${edit_page_id}/`, formData);
    }else{
      await postData("schedule/task_status/", dataToBeSent);
    }
    
  };

  return (
      <Card>
        <CardHeader title="Input Fields" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>
              <Grid size={6}>
                <CustomDatePicker
                  label="Date"
                  value={formData.date}
                  // value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue )}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label={'Spending Time in Minutes'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.spendingTime}
                  onChange={(e) =>
                    handleFormChange('spendingTime', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 500, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={12}>
                <StaticAutocomplete
                  label="Task Name"
                  options={mem_task_name_map}
                  defaultValue={mem_task_name_map.filter((item) => item.value === formData.task)[0]}
                  formKey="task"
                  multiple={edit_page_id || ids.length>0?false:true}
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={6}>
                <StaticAutocomplete
                  label="Task Status"
                  options={TaskStatusStatus}
                  defaultValue={TaskStatusStatus.filter((item) => item.value === formData.status)[0]}
                  formKey="status"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>  
              <Grid size={6}>
                <StaticAutocomplete
                  label="Task Importance Level"
                  options={importanceLevel}
                  defaultValue={importanceLevel.filter((item) => item.value === formData.importance_level)[0]}
                  formKey="importance_level"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>  
              <Grid size={12}>
                <CustomSwitch 
                  value={formData.isTodaySTask}
                  onChange={useCallback((newValue) => handleFormChange('isTodaySTask', newValue),[])}
                  label="Is Today's Task"
                />
              </Grid>  
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Tasks Note"/>
              </Grid>           
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/goals/task_progress'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;





// import {TaskStatusRowSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
// import {TaskStatusStatus} from '../../../utility/function/data';

// import { useState,useMemo } from 'react';
// import { inputFields } from "./config";
// import { useAddEditPage}         from "../../../utility/customHook";
// import {FormLayout,FieldRenderer}       from '../../../components/Form';
// import { useParams }    from 'react-router-dom';
// import {usePaginationContext}                  from '../../../store/context/paginationContext';



// import {TaskStatusFormIntialState}  from "../../../utility/function/defaultData"
// import { TaskStatusFormStateInterface } from '../../../utility/types/Page';

// import {StatusCase2 } from '../../../utility/function/data';
// import { filterStatusOptions_2 as single_task_status } from '../../../utility/function/data';

// const CollapsibleForm = () => {

//   const  {secondary}              = usePaginationContext();

//   const {type:single_task_type } = secondary;
//   const singleTaskPriority = StatusCase2.map(({value,label})=>({value:value.toLowerCase(),label}))

//   const memSingleTaskPriority   = useMemo(() => singleTaskPriority, []);
//   const memSingleTaskType      = useMemo(() => single_task_type, []);
//   const memSingleTaskStatus     = useMemo(() => single_task_status, []);

//     const [pageName,setPageName] = useState<string>("task_status_added");
  
//     const {
//       formData,formErrors, handleFormChange, handleSave, setPageRedirect,
//       open, message, severity, closeSnackbar, isEdit,responseData,actionState,orignalResponse
//     } = useAddEditPage<TaskStatusFormStateInterface>({
//       fetchUrl: (id) => `schedule/task_status/${id}`,
//       postUrl: "schedule/task_status/",
//       editUrl: (id) => `schedule/task_status/${id}/`,
//       initialState: TaskStatusFormIntialState,
//       onSuccessRedirect: "/goals/task_progress",
//       page_name: pageName
//     });


//   const saveReturn = () => { setPageRedirect(true); handleSave(); };
//   const saveContinue = () => { setPageRedirect(false); handleSave(); };

//   const { id:edit_page_id }     = useParams();

//   return (        
//         <FormLayout
//           title="Single Task Form"
//           onSaveReturn={saveReturn}
//           onSaveContinue={saveContinue}
//           page_name={pageName}
//           isEdit={isEdit}
//           onSuccessRedirect="/goals/single_task"
//           snackbar={{ open, message, severity, onClose: closeSnackbar }}
//         >
//           {inputFields({memSingleTaskStatus,memSingleTaskPriority,memSingleTaskType}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
//             return (
//             <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
//           )
//           })}
//         </FormLayout>    
//   );
// };
// export default CollapsibleForm;