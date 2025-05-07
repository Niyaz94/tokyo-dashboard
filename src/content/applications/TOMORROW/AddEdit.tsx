import React, { useState,useEffect,useCallback,useMemo } from 'react';
import { useSelector }                from 'react-redux';
import { useNavigate,useParams }    from 'react-router-dom';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';




import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import CustomizedSwitch             from '../../../components/Form/CustomSwitch';
import MultiButton                  from "../../../components/Form/MultiButton"
import CustomDatePicker             from '../../../components/Form/CustomDatePickers';
import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';


import {TomorrowSingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';
import { usePostAPI, useEditAPI, useFetch, FetchData }         from "../../../utility/customHook";
import {TomorrowFormIntialStateInterface as FormIntialState}   from "../../../utility/function/defaultData"
import { StatusCase1,StatusCase2  }                         from '../../../utility/function/data';
import { TomorrowFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';


import { RootState }                    from '../../../store/Reducer';
import {useActivity as usePage}                  from '../../../store/context/activityContext';

import DynamicAutocomplete             from '../../../components/Form/DynamicAutocomplete';
import {axiosGetData} from '../../../utility/Axios'


const CollapsibleForm = () => {

  const  {setTable}               = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);
  const dailyData               = useSelector((state: RootState) => state.daily.data);
  

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/tomorrow/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/personal/tomorrow'))
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
      await editData(`notes/tomorrow/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("notes/tomorrow/", dataToBeSent);
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
              <Grid size={6} >
                <CustomDatePicker
                  label="Date"
                  value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue )}
                />
              </Grid>
              <Grid size={6}>
                {/* <StaticAutocomplete
                  label="Select The Day"
                  options={dailyData}
                  defaultValue={dailyData.filter(({label,value}) => value == Number(formData.daily))[0]}
                  formKey="daily"
                  onChange={handleFormChange}
                /> */}
                <DynamicAutocomplete
                  label="Select The Day"
                  fetchOptions={async (query) => {
                    const res = axiosGetData(`notes/daily/query_date/?query=${query}`);
                    const {data} = await res;
                    return  data ?? [];
                  }}
                  formKey="daily"
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid size={12}>
                <CustomizedSwitch 
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