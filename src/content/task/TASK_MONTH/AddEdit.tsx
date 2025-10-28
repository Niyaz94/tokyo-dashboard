import { usePostAPI, useEditAPI, useFetch, FetchData }         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams }    from 'react-router-dom';
import {TaskMonthFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"


import { TaskMonthFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import {useTaskStatus as usePage}                  from '../../../store/context/taskStatusContext';



import {MultiButton,CustomDatePicker}       from '../../../components/Form';

const CollapsibleForm = () => {


  const  {setTable}               = usePage();

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);


  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`schedule/month/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/goals/months'))
  }
  const saveContinue=()=>{
    // handleSave().then(()=>cleanForm())
    handleSave()
  }

  useEffect(() => {
      const {success,data}=response || {success:false,data:null};
      // setTable(prev => success ?[{
      //   ...data, 
      //   total_completed: 0, 
      //   total_inprogress: 0, 
      //   total_notstarted: 0, 
      //   total_others: 0
      // },...prev]:prev);
  }, [response]);

  useEffect(() => {
      const {success,data}=editResponse || {success:false,data:null};
      // setTable(prev => success ?[...prev.map((item:SingleSampleInterface) => item.id === data.id?{
      //   ...item,
      //   name:data["name"],
      //   description:data["description"]
      // }:item),data]:prev);
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
      await editData(`schedule/month/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("schedule/month/", dataToBeSent);
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

              
              <Grid size={6} sx={{paddingTop: "10px"}}>
                <CustomDatePicker
                  label="Task Month"
                  value={formData.name}
                  // value={formData.date}
                  pickerType="monthOnly"
                  placeholder=""
                  onChange={(newValue) => handleFormChange('name', newValue )}
                />
              </Grid>
              <Grid size={6} sx={{paddingTop: "10px"}}>
                <CustomDatePicker
                  label="Task Year"
                  value={formData.year}
                  // value={formData.date}
                  pickerType="yearOnly"
                  placeholder=""
                  onChange={(newValue) => handleFormChange('year', newValue )}
                />
              </Grid>
              
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/goals/months'}/>
              </Grid>
            </Grid>
            {/* {post_api_error && <p style={{ color: "red" }}>Error: {post_api_error}</p>}
            {success && <p style={{ color: "green" }}>Success! Data submitted.</p>}
            {response && response.data && (
              <pre>Response: {JSON.stringify(response.data, null, 2)}</pre>
            )} */}
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;