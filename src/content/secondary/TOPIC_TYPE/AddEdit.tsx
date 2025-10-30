import { useState,useEffect,useCallback,useRef,useMemo } from 'react';
import { useNavigate,useParams,useLocation }    from 'react-router-dom';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';


import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {
  CustomSnackbar,MultiButton
}       from '../../../components/Form';

import {TomorrowSingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';
import { usePostAPI, useEditAPI, useFetch, FetchData,useSnackbar }  from "../../../utility/customHook";
import {PageTypeFormIntialState}   from "../../../utility/function/defaultData"
import {PageTypeFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';


import {usePageContext as usePage}      from '../../../store/context/pageContext';


const CollapsibleForm = () => {
  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();

  const  {setTable,pageDefault} = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(PageTypeFormIntialState);



  const location = useLocation();
  const fromPath =  location.state?.from;

  console.log("fromPath:", fromPath);


  
  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/topic_type/${edit_page_id}`: null,{});
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
      await editData(`notes/topic_type/${edit_page_id}/`, formData);
    }else{
      await postData("notes/topic_type/", dataToBeSent,"FORM");
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
      // const errorMessage = post_api_error || editError;
      const errorMessage = post_api_error.message || editError.message;

      const success = postSuccess || editSuccess;
      const successMessage = postSuccess ? 'Submitted successfully!' : editSuccess ? 'Edited successfully!' : null;

      if (success) {
        showSnackbar(successMessage, 'success');
        setTimeout(() => {
          if(pageReDirect) 
            navigate(fromPath);
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
    setFormData(PageTypeFormIntialState)
  };

  return (
      <Card>
        <CardHeader title="Topic Type" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>
              <Grid size={12} sx={{paddingTop: "10px"}}>
                <TextField
                  label="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  fullWidth
                />
              </Grid>  
              
              <Grid size={12}>
                <LexicalEditor value={formData.notes} onChange={handleFormChange} formKey="notes" label="Detail" height="750px"/>
              </Grid> 
              <Grid size={12}>
                <MultiButton 
                  type={edit_page_id ?"edit":"insert"} 
                  saveContinue={saveContinue} 
                  saveReturn={saveReturn} 
                  returnUrl={fromPath}
                />
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;