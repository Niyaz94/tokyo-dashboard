import { 
  usePostAPI, useEditAPI, useFetch, FetchData , useSnackbar
}         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useMemo, useRef } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams,useLocation }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import {MultiButton,CustomSnackbar,CustomSwitch,CustomDatePicker}                  from "../../../components/Form"
import {TaskStatusFormIntialState}  from "../../../utility/function/defaultData"

import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';

import { TaskStatusFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';

import {createSelectMap,getDeepText}                from '../../../utility/function/main';
import {TaskStatusRowSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
import dayjs                           from "dayjs";


const CollapsibleForm = () => {

  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();
  const  {secondary,table,setTable}              = usePaginationContext();
  const {tasks_name,task_status}  = secondary;

  const task_name_map         = createSelectMap(tasks_name.filter(row=>row[2]=="active").map(row=>row))
  const mem_task_name_map     = useMemo(() => task_name_map, []);


  const task_status_map         = createSelectMap(task_status,"array")
  const mem_task_status_map     = useMemo(() => task_status_map, []);

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
        setTable(prev => [response.data, ...prev]);
      }
  
      if (editSuccess && editResponse?.data) {
        setTable(prev => prev.map((item: SingleSampleInterface) =>
          item.id === editResponse.data.id ? editResponse.data : item
        ));
      }
      try {
        const errorMessage = post_api_error || editError;
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
  const cleanForm = () => {
    setFormData(TaskStatusFormIntialState)
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
              <Grid size={6}>
                <StaticAutocomplete
                  label="Task Name"
                  options={mem_task_name_map}
                  defaultValue={mem_task_name_map.filter((item) => item.value === formData.task)[0]}
                  formKey="task"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={6}>
                <StaticAutocomplete
                  label="Task Status"
                  options={mem_task_status_map}
                  defaultValue={mem_task_status_map.filter((item) => item.value === formData.status)[0]}
                  formKey="status"
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