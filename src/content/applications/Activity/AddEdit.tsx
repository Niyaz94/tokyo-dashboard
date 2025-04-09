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
import {ActivityFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"

import { useSelector }              from 'react-redux';
import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';
import { StatusCase1 as ActivityStatus }   from '../../../utility/function/data';


import { RootState }                    from '../../../store/Reducer';
import { ActivityFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import {useActivity as usePage}                  from '../../../store/context/activityContext';

import {ActivitySingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';


const CollapsibleForm = () => {

  const  {setTable}               = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);
  const dailyData               = useSelector((state: RootState) => state.daily.data);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/activity/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/personal/activity'))
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
      await editData(`notes/activity/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
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
                <StaticAutocomplete
                  label="Select The Day"
                  options={dailyData}
                  defaultValue={dailyData.filter(({label,value}) => value == Number(formData.daily))[0]}
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
                <CustomizedSwitch 
                  value={formData.isGoingGym}
                  onChange={useCallback((newValue) => handleFormChange('isGoingGym', newValue),[])}
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