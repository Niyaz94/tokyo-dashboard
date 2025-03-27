import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,FC } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import CustomDatePicker             from '../../../components/Form/CustomDatePickers';
import CustomizedSwitch             from '../../../components/Form/CustomSwitch';
import MultiButton                  from "../../../components/Form/MultiButton"
import Template                     from '../../../components/Page/Template';
import {TaskStatusFormIntialState}  from "../../../utility/function/defaultData"

import { useSelector }              from 'react-redux';
import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';

import { RootState }                    from '../../../store/Reducer';
import { TaskStatusFormStateInterface } from '../../../utility/types/Page';
import {useAddEdit}                     from '../../../store/Context';

import {createSelectMap}                from '../../../utility/function/main';


const CollapsibleForm = () => {

  const  {addEditData}  = useAddEdit();

  const {tasks_name,task_status} = addEditData;

  const task_name_map   = createSelectMap(tasks_name.filter(row=>row[2]=="active").map(row=>row))
  const task_status_map = createSelectMap(task_status,"array")


  const navigate              = useNavigate();
  const { id:edit_sleep_id }  = useParams();

  const [formData, setFormData] = useState(TaskStatusFormIntialState);
  const dailyData               = useSelector((state: RootState) => state.daily.data);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<TaskStatusFormStateInterface>  = useFetch <TaskStatusFormStateInterface>(edit_sleep_id ?`notes/sleep/${edit_sleep_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/personal/sleep'))
  }
  const saveContinue=()=>{
    // handleSave().then(()=>cleanForm())
    handleSave()
  }

  useEffect(() => {
    if (Object.keys(fetchEditData).length > 0) {
      // Uncommented for edit
      // setFormData({...fetchEditData});
    }
  }, [fetchEditData]);

  const handleFormChange = (key, value) => {
    // console.log("handleFormChange",key,value)
    setFormData((prev) => ({...prev,[key]: value}));
  };
  const handleSave = async () => {
    console.log("handleSave",formData)
    const { id, ...dataToBeSent } = formData; // Destructure once
    // if (edit_sleep_id) {
      // await editData(`notes/sleep/${edit_sleep_id}/`, formData);
    // }else{
      // await postData("notes/sleep/", dataToBeSent);
    // }
    
  };
  const cleanForm = () => {
    setFormData(TaskStatusFormIntialState)
  };

  return (
    <Template templateTitle="Personal - Sleep">
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
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue)}
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
                  label="Morning Feeling"
                  options={task_name_map}
                  defaultValue={task_name_map.filter((item) => item.value === formData.task)[0]}
                  formKey="task"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={6}>
                <StaticAutocomplete
                  label="Morning Feeling"
                  options={task_status_map}
                  defaultValue={task_status_map.filter((item) => item.value === formData.status)[0]}
                  formKey="status"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>  
              <Grid size={12}>
                <CustomizedSwitch 
                  value={formData.isTodaySTask}
                  onChange={(newValue) => handleFormChange('isTodaySTask', newValue)}
                  label="Is Today's Task"
                />
              </Grid>  
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Tasks Note"/>
              </Grid>           
              <Grid size={12}>
                <MultiButton type={edit_sleep_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/goals/task_progress'}/>
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
    </Template>
  );
};
export default CollapsibleForm;