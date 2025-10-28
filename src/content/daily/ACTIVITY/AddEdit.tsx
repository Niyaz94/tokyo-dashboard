import { usePostAPI, useEditAPI, useFetch, FetchData,useSnackbar } from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useRef} from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField,Grid} from '@mui/material';


import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import {ActivityFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"

import { StatusCase1 as ActivityStatus }   from '../../../utility/function/data';


import { ActivityFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';

import {ActivitySingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';

import {
  CustomSwitch,StaticAutocomplete,MultiButton,DynamicAutocomplete,CustomSnackbar
}       from '../../../components/Form';

import {dailySearch}                    from "../../../utility/function/main"

const ActivityInsertUpdateComponent = () => {

  
  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();
  
  const navigate                  = useNavigate();
  const { id:edit_page_id }       = useParams();
  const isFirstRender = useRef(true);

  const  {setTable,pageDefault}   = usePage();
  const [formData, setFormData]   = useState(FormIntialState);

  const selectDefaultValue = edit_page_id && pageDefault?.date?.value ? pageDefault.date : null;

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/activity/${edit_page_id}`: null,{});
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
        const errorMessage = post_api_error.message || editError.message;
        const success = postSuccess || editSuccess;
        const successMessage = postSuccess ? 'Submitted successfully!' : editSuccess ? 'Edited successfully!' : null;
  
        if (success) {
          showSnackbar(successMessage, 'success');
          setTimeout(() => {if(pageReDirect) navigate('/personal/activity');}, 1500); 
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
    setFormData((prev) => ({...prev,[key]: value}));
  },[]);
  
  const handleSave = async () => {
    const { id, ...dataToBeSent } = formData; // Destructure once
    if (edit_page_id) {
      await editData(`notes/activity/${edit_page_id}/`, formData);
    }else{
      // console.log("formData",formData)
      await postData("notes/activity/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(FormIntialState)
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
                  label="Activity Level"
                  defaultValue={ActivityStatus.filter((item) => item.value === formData.activityLevel)[0]}
                  options={ActivityStatus}
                  formKey="activityLevel"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Eating Level"
                  options={ActivityStatus}
                  defaultValue={ActivityStatus.filter((item) => item.value === formData.eatingLevel)[0]}
                  formKey="eatingLevel"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Weight In KG'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    handleFormChange('weight', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 500, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Consume Water In Liters'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.consumeWaterInLiters}
                  onChange={(e) =>
                    handleFormChange('consumeWaterInLiters', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Minimum Burn Calories'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.minBurnCalories}
                  onChange={(e) =>
                    handleFormChange('minBurnCalories', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 2000, min: 0, step: 1 }
                  }}
                />
              </Grid>   
              <Grid size={6}>
                <TextField
                  label={'MB Number'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.mbNumber}
                  onChange={(e) =>
                    handleFormChange('mbNumber', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 5, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label={'MB Spending Time'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.mbSpendingTime}
                  onChange={(e) =>
                    handleFormChange('mbSpendingTime', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 600, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={12}>
                <CustomSwitch 
                  value={formData.isGoingGym}
                  onChange={(newValue) => handleFormChange('isGoingGym', newValue)}
                  label="Is Going Gym"
                />
              </Grid>  
              <Grid size={6}>
                <LexicalEditor value={formData.eattingNotes} onChange={handleFormChange} formKey="eattingNotes" label="Eatting Notes"/>
              </Grid>  
              <Grid size={6}>
                <LexicalEditor value={formData.activityNotes} onChange={handleFormChange} formKey="activityNotes" label="Activity Notes"/>
              </Grid> 
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/personal/activity'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>
            
          </Box>
        </CardContent>
      </Card>
  );
};
export default ActivityInsertUpdateComponent;