import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useMemo } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import CustomizedSwitch             from '../../../components/Form/CustomSwitch';
import MultiButton                  from "../../../components/Form/MultiButton"
import CustomDatePicker             from '../../../components/Form/CustomDatePickers';

import {TodayFormIntialStateInterface as FormIntialState}  from "../../../utility/function/defaultData"

import { useSelector }              from 'react-redux';
import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';
import { StatusCase1,StatusCase2  }   from '../../../utility/function/data';


import { RootState }                    from '../../../store/Reducer';
import { TodayFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import {useActivity as usePage}                  from '../../../store/context/activityContext';

import {ActivitySingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';


const CollapsibleForm = () => {

  const  {setTable}               = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);
  const dailyData               = useSelector((state: RootState) => state.daily.data);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/daily/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/personal/today'))
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
      setTable(prev => success ?[...prev.map((item:SingleSampleInterface) => item.id === data.id?data:item),data]:prev);
  }, [editResponse]);


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
                <CustomizedSwitch 
                  value={formData.isBusyDay}
                  onChange={useCallback((newValue) => handleFormChange('isBusyDay', newValue),[])}
                  label="Is Busy Day"
                />
              </Grid>  
              <Grid size={4}>
                <CustomizedSwitch 
                  value={formData.isMeditation}
                  onChange={useCallback((newValue) => handleFormChange('isMeditation', newValue),[])}
                  label="Is Meditation"
                />
              </Grid>
              <Grid size={4}>
                <CustomizedSwitch 
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