import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useMemo, use } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import CustomDatePicker             from '../../../components/Form/CustomDatePickers';
import CustomizedSwitch             from '../../../components/Form/CustomSwitch';
import MultiButton                  from "../../../components/Form/MultiButton"
import {TaskStatusFormIntialState}  from "../../../utility/function/defaultData"

import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';

import { TaskStatusFormStateInterface } from '../../../utility/types/Page';
import {useTaskStatus}                  from '../../../store/context/tastStatusContext';

import {createSelectMap}                from '../../../utility/function/main';
import {TaskStatusSingleSampleInterface} from 'src/utility/types/data_types';
import dayjs                           from "dayjs";


const CollapsibleForm = () => {

  const  {secondary,table,setTable}              = useTaskStatus();
  const {tasks_name,task_status}  = secondary;

  const task_name_map         = createSelectMap(tasks_name.filter(row=>row[2]=="active").map(row=>row))
  const mem_task_name_map     = useMemo(() => task_name_map, []);


  const task_status_map         = createSelectMap(task_status,"array")
  const mem_task_status_map     = useMemo(() => task_status_map, []);

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(TaskStatusFormIntialState);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<TaskStatusFormStateInterface>  = useFetch <TaskStatusFormStateInterface>(edit_page_id ?`schedule/task_status/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/goals/task_progress'))
  }
  const saveContinue=()=>{
    // handleSave().then(()=>cleanForm())
    handleSave()
  }

  useEffect(() => {
      const {success,data}=response || {success:false,data:null};
      setTable(prev => success ?[data,...prev]:prev);
  }, [response]);

  useEffect(() => {
      const {success,data}=editResponse || {success:false,data:null};
      setTable(prev => success ?[...prev.map((item:TaskStatusSingleSampleInterface) => item.id === data.id?data:item),data]:prev);
  }, [editResponse]);


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
    if (edit_page_id) {
      await editData(`schedule/task_status/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
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
                <CustomizedSwitch 
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
              </Grid>
            </Grid>
            {post_api_error && <p style={{ color: "red" }}>Error: {post_api_error}</p>}
            {success && <p style={{ color: "green" }}>Success! Data submitted.</p>}
            {response && response.data && (
              <pre>Response: {JSON.stringify(response.data, null, 2)}</pre>
            )}
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;