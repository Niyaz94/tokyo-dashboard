import { 
  usePostAPI, useEditAPI, useFetch, FetchData , useSnackbar
}         from "../../../utility/customHook";

import { useState,useEffect,useCallback,useRef } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {TodayFormIntialStateInterface as FormIntialState}  from "../../../utility/function/defaultData"

import { StatusCase1,StatusCase2  }   from '../../../utility/function/data';

import {
  CustomSwitch,StaticAutocomplete,MultiButton,CustomDatePicker,CustomSnackbar
}       from '../../../components/Form';


import { TodayFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import {usePageContext as usePage}                  from '../../../store/context/pageContext';

import {ActivitySingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';


const CollapsibleForm = () => {
  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();
  const  {setTable}               = usePage();

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const isFirstRender = useRef(true);
  const [formData, setFormData] = useState(FormIntialState);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/daily/${edit_page_id}`: null,{});
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
          setTimeout(() => {if(pageReDirect) navigate('/personal/today');}, 1500); 
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
      await editData(`notes/daily/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("notes/daily/", dataToBeSent);
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
                <CustomDatePicker
                  label="Date"
                  value={formData.date}
                  // value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue )}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Info Consumption Level"
                  defaultValue={StatusCase2.filter((item) => item.value === formData.infoConsumptionLevel)[0]}
                  options={StatusCase2}
                  formKey="infoConsumptionLevel"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Worrying Level"
                  options={StatusCase1}
                  defaultValue={StatusCase1.filter((item) => item.value === formData.worryingLevel)[0]}
                  formKey="worryingLevel"
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid size={4}>
                <TextField
                  label={'Useful Time In Minutes'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.usefulTimeInMinutes}
                  onChange={(e) =>
                    handleFormChange('usefulTimeInMinutes', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 5, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Wasting Time In Minutes'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.wastedTimeInMinutes}
                  onChange={(e) =>
                    handleFormChange('wastedTimeInMinutes', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 600, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'What is success rate'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.successRate}
                  onChange={(e) =>
                    handleFormChange('successRate', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 600, min: 0, step: 1 }
                  }}
                />
              </Grid>
              
              <Grid size={4}>
                <CustomSwitch 
                  value={formData.isBusyDay}
                  onChange={useCallback((newValue) => handleFormChange('isBusyDay', newValue),[])}
                  label="Is Busy Day"
                />
              </Grid>  
              <Grid size={4}>
                <CustomSwitch 
                  value={formData.isMeditation}
                  onChange={useCallback((newValue) => handleFormChange('isMeditation', newValue),[])}
                  label="Is Meditation"
                />
              </Grid>
              <Grid size={4}>
                <CustomSwitch 
                  value={formData.isSuccessfulDay}
                  onChange={useCallback((newValue) => handleFormChange('isSuccessfulDay', newValue),[])}
                  label="Is Successful Day"
                />
              </Grid>
            
              <Grid size={6}>
                <LexicalEditor value={formData.dailyNotes} onChange={handleFormChange} formKey="dailyNotes" label="Daily Notes"/>
              </Grid>  
              <Grid size={6}>
                <LexicalEditor value={formData.whatToDoBetter} onChange={handleFormChange} formKey="whatToDoBetter" label="What To Do Better"/>
              </Grid> 

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/personal/today'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;