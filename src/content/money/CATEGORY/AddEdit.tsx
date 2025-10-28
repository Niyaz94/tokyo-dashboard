import { usePostAPI, useEditAPI, useFetch, FetchData }         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import {MultiButton,StaticAutocomplete}                  from "../../../components/Form"
import {CategoryTypeFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"


import { CategoryTypeFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import {useTaskStatus as usePage}                  from '../../../store/context/taskStatusContext';

import { CategoryType }   from '../../../utility/function/data';



const CollapsibleForm = () => {


  const  {setTable}               = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);


  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`money/category/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/transactions/category'))
  }
  const saveContinue=()=>{
    // handleSave().then(()=>cleanForm())
    handleSave()
  }

  useEffect(() => {
      const {success,data}=response || {success:false,data:null};
      // setTable(prev => success ?[{
        // ...data, 
        // total_completed: 0, 
        // total_inprogress: 0, 
        // total_notstarted: 0, 
        // total_others: 0
      // },...prev]:prev);
  }, [response]);

  useEffect(() => {
      const {success,data}=editResponse || {success:false,data:null};
      // setTable(prev => success ?[...prev.map((item:SingleSampleInterface) => item.id === data.id?{
        // ...item,
        // name:data["name"],
        // description:data["note"]
      // }:item),data]:prev);
  }, [editResponse]);


  useEffect(() => {
    if (Object.keys(fetchEditData).length > 0) {
      setFormData({...fetchEditData});
      // console.log("fetchEditData",formData.description)
    }
  }, [fetchEditData]);

  const handleFormChange = useCallback((key, value) => {
    setFormData((prev) => ({...prev,[key]: value}));
  },[]);
  
  const handleSave = async () => {
    const { id, ...dataToBeSent } = formData; // Destructure once
    if (edit_page_id) {
      await editData(`money/category/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("money/category/", dataToBeSent);
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
                <TextField
                  label="Category Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <StaticAutocomplete
                  label="Category Type"
                  defaultValue={CategoryType.filter((item) => item.value === formData.category)[0]}
                  options={CategoryType}
                  formKey="category"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Category Description"/>
              </Grid> 

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/transactions/category'}/>
              </Grid>
            </Grid>
            {/* {post_api_error && <p style={{ color: "red" }}>Error: {post_api_error.message}</p>}
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