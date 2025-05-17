import React, { useState,useEffect,useCallback,useRef } from 'react';
import { useNavigate,useParams }    from 'react-router-dom';
import {Card,CardHeader,CardContent,Divider,Box} from '@mui/material';
import Grid from '@mui/material/Grid2';

import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {CustomSwitch,CustomSnackbar,MultiButton,CustomDatePicker}       from '../../../components/Form';


import {TomorrowSingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';
import { usePostAPI, useEditAPI, useFetch, FetchData,useSnackbar }  from "../../../utility/customHook";
import {TomorrowFormIntialStateInterface as FormIntialState}   from "../../../utility/function/defaultData"
import {TomorrowFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';


import {usePageContext as usePage}      from '../../../store/context/pageContext';

import DynamicAutocomplete             from '../../../components/Form/DynamicAutocomplete';
import {dailySearch}                    from "../../../utility/function/main"


const CollapsibleForm = () => {
  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();

  const  {setTable,pageDefault} = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);

  const selectDefaultValue = edit_page_id && pageDefault?.date?.value ? pageDefault.date : null;

  
  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/tomorrow/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();
  const isFirstRender = useRef(true);
  const [pageReDirect, setPageRedirect] = useState(false);

  const saveReturn=()=>{
    handleSave().then(()=>{setPageRedirect(true);})
  }
  const saveContinue=()=>{
    handleSave().then(()=>{setPageRedirect(false);})
  }

  const handleSave = async () => {
    const { id, ...dataToBeSent } = formData; // Destructure once
    if (edit_page_id) {
      await editData(`notes/tomorrow/${edit_page_id}/`, formData);
    }else{
      await postData("notes/tomorrow/", dataToBeSent);
    }
  };

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
        setTimeout(() => {
          if(pageReDirect) 
            navigate('/personal/tomorrow');
        }, 1500); 
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
              <Grid size={6} >
                <CustomDatePicker
                  label="Date"
                  value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue )}
                />
              </Grid>
              <Grid size={6}>
                <DynamicAutocomplete
                  label="Select The Day"
                  defaultValue={selectDefaultValue}
                  fetchOptions={dailySearch}
                  formKey="daily"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={12}>
                <CustomSwitch 
                  value={formData.hasPlan}
                  onChange={useCallback((newValue) => handleFormChange('hasPlan', newValue),[])}
                  label="Do you have a plan for tomorrow?"
                />
              </Grid>      
              <Grid size={12}>
                <LexicalEditor value={formData.tomorrowNotes} onChange={handleFormChange} formKey="tomorrowNotes" label="Tomorrow's Notes"/>
              </Grid>  
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/personal/tomorrow'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>           
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;