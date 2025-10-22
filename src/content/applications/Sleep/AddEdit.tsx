import React, { useState,useEffect,useCallback,useRef } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams } from 'react-router-dom';
import dayjs                  from 'dayjs';
import LexicalEditor          from '../../../components/Custom/Lexical/Editor';
import { StatusCase1 as sleepStatus }        from '../../../utility/function/data';
import { 
  usePostAPI, useEditAPI, useFetch, FetchData , useSnackbar
}       from "../../../utility/customHook";
import {
  TimePickers,StaticAutocomplete,MultiButton,DynamicAutocomplete,CustomSwitch,CustomSnackbar
}       from '../../../components/Form';
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';
import { SleepFormStateInterface } from '../../../utility/types/Page';
import {sleepFormIntialState} from "../../../utility/function/defaultData"
import {dailySearch}                    from "../../../utility/function/main"
import {SleepRowSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';


const CollapsibleForm: React.FC = () => {

  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();
  
  const navigate              = useNavigate();
  const { id:edit_page_id }  = useParams();
  const isFirstRender = useRef(true);

  const  {setTable,pageDefault}   = usePage();
  const [formData, setFormData] = useState(sleepFormIntialState);

  const selectDefaultValue = edit_page_id && pageDefault?.date?.value ? pageDefault.date : null;


  const { data:fetchEditData,success:editReturnSuccess}: FetchData<SleepFormStateInterface>   = useFetch <SleepFormStateInterface>(edit_page_id ?`notes/sleep/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}         = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}              = useEditAPI();

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
          setTimeout(() => {if(pageReDirect) navigate('/personal/sleep');}, 1500); 
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

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({...prev,[key]: value}));
  };
  const handleSave = async () => {
    const { id, ...dataToBeSent } = formData; // Destructure once
    if (edit_page_id) {
      await editData(`notes/sleep/${edit_page_id}/`, formData);
    }else{
      await postData("notes/sleep/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(sleepFormIntialState)
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
              <Grid size={4}>
                <TimePickers
                  label="Bed Time"
                  value={formData.bedTime}
                  onChange={(newValue) => handleFormChange('bedTime', newValue)}
                />
              </Grid>
              <Grid size={4}>
                <TimePickers
                  label="Fell Sleep Time"
                  value={formData.approxFellSleepTime}
                  onChange={(newValue) =>
                    handleFormChange('approxFellSleepTime', newValue)
                  }
                />
              </Grid>
              <Grid size={4}>
                <TimePickers
                  label="Waking Up Time"
                  value={dayjs(formData.morningWakingUp, 'HH:mm:ss')}
                  onChange={(newValue) =>
                    handleFormChange('morningWakingUp', newValue)
                  }
                />
              </Grid>
              <Grid size={4}>
                <DynamicAutocomplete
                  label="Select The Day"
                  defaultValue={selectDefaultValue}
                  fetchOptions={dailySearch}
                  formKey="daily"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Morning Feeling"
                  options={sleepStatus}
                  defaultValue={sleepStatus.filter((item) => item.value === formData.morningFeeling)[0]}
                  formKey="morningFeeling"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Sleep State"
                  defaultValue={sleepStatus.filter((item) => item.value === formData.SleepState)[0]}
                  options={sleepStatus}
                  formKey="SleepState"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <TextField
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
                />
              </Grid>
              <Grid size={4}>
                <TextField
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
                />
              </Grid>
              <Grid size={4}>
                <TextField
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
                />
              </Grid>
              <Grid size={6}>
                <CustomSwitch 
                  value={formData.isSleepControl}
                  onChange={useCallback((newValue) => handleFormChange('isSleepControl', newValue),[])}
                  label="Do You Control Your Sleep?"
                />
              </Grid> 
                <Grid size={6}>
                <CustomSwitch 
                  value={formData.isEatDrinkBeforeSleep}
                  onChange={useCallback((newValue) => handleFormChange('isEatDrinkBeforeSleep', newValue),[])}
                  label="Do You Eat or Drink Before Sleep?"
                />
              </Grid> 
              
              <Grid size={6}>
                <LexicalEditor value={formData.whatYouThink} onChange={handleFormChange} formKey="whatYouThink" label="What You Think"/>
              </Grid>
              <Grid size={6}>
                <LexicalEditor value={formData.sleepNotes} onChange={handleFormChange} formKey="sleepNotes" label="Sleep Notes"/>
              </Grid>
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/personal/sleep'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;