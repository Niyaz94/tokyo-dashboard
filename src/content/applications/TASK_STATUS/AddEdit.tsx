import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,FC } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams } from 'react-router-dom';
import dayjs                  from 'dayjs';
import LexicalEditor          from '../../../components/Custom/Lexical/Editor';

import CustomDatePicker       from '../../../components/Form/CustomDatePickers';
import CustomizedSwitch       from '../../../components/Form/CustomSwitch';


import StaticAutocomplete     from '../../../components/Form/StaticAutocomplete';
import MultiButton            from "../../../components/Form/MultiButton"

import Template               from '../../../components/Page/Template';

import { sleepStatus }        from '../../../utility/function/data';
import {TaskStatusFormIntialState} from "../../../utility/function/defaultData"

import { useSelector }        from 'react-redux';

import { RootState }                    from '../../../store/Reducer';
import { TaskStatusFormStateInterface } from '../../../utility/types/Page';
import {useAddEdit}                     from '../../../store/Context';


interface AddEditProps {
  tasks_name: string[];
  task_status: string[];
}
const CollapsibleForm = () => {

  const  {addEditData}  = useAddEdit();

  const {tasks_name,task_status} = addEditData;

  console.log(tasks_name.filter(row=>row[1]=="active").map(row=>row[0]),task_status)

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
    handleSave().then(()=>cleanForm())
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
              <Grid size={4}>
                <CustomizedSwitch 
                  value={formData.isTodaySTask}
                  onChange={(newValue) => handleFormChange('isTodaySTask', newValue)}
                  label="Is Today's Task"
                />
              </Grid>
              <Grid size={4}>
                {/* <StaticAutocomplete
                  label="Morning Feeling"
                  options={sleepStatus}
                  defaultValue={sleepStatus.filter((item) => item.value === formData.morningFeeling)[0]}
                  formKey="morningFeeling"
                  onChange={handleFormChange}
                /> */}
              </Grid>
              <Grid size={4}>
                {/* <StaticAutocomplete
                  label="Sleep State"
                  defaultValue={sleepStatus.filter((item) => item.value === formData.SleepState)[0]}
                  options={sleepStatus}
                  formKey="SleepState"
                  onChange={handleFormChange}
                /> */}
              </Grid>
              <Grid size={4}>
                {/* <TextField
                  label={'Day Time Sleep'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.dayTimeSleepInMinutes}
                  onChange={(e) =>
                    handleFormChange('dayTimeSleepInMinutes', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 600, min: 0, step: 1 }
                  }}
                /> */}
              </Grid>
              <Grid size={4}>
                {/* <TextField
                  label={'Pee Count During Night'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.peeCountDuringNight}
                  onChange={(e) =>
                    handleFormChange('peeCountDuringNight', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                /> */}
              </Grid>
              <Grid size={4}>
                {/* <TextField
                  label={'Waking Up Time'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.approxWakingNum}
                  onChange={(e) =>
                    handleFormChange('approxWakingNum', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                /> */}
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