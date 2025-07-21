import { useState,useEffect,useCallback,useRef,useMemo } from 'react';
import { useNavigate,useParams }    from 'react-router-dom';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FoodRecipeDelicious }  from '../../../utility/function/data';
import {createSelectMap}              from '../../../utility/function/main';


import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {CustomSnackbar,MultiButton,CustomDatePicker,StaticAutocomplete}       from '../../../components/Form';

import { usePostAPI, useEditAPI, useFetch, FetchData,useSnackbar }  from "../../../utility/customHook";
import {RecipeFormIntialStateInterface as FormIntialState}   from "../../../utility/function/defaultData"
import {RecipeFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';


import {usePageContext as usePage}      from '../../../store/context/pageContext';


const CollapsibleForm = () => {
  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();

  const  {setTable,pageDefault} = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);

  const selectDefaultValue = edit_page_id && pageDefault?.date?.value ? pageDefault.date : null;


  const recipe_status_map         = createSelectMap(FoodRecipeDelicious,"array")
  const mem_recipe_status_map     = useMemo(() => recipe_status_map, []);

  
  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/recipe/${edit_page_id}`: null,{});
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
      await editData(`notes/recipe/${edit_page_id}/`, formData);
    }else{
      await postData("notes/recipe/", dataToBeSent);
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
      setTable(prev => prev.map((item) =>
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
            navigate('/extra/foodrecipe');
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
        <CardHeader title="Topics" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>
              <Grid size={4} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Title"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={4} >
                <CustomDatePicker
                  label="Date"
                  value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue )}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Delicious Level"
                  options={mem_recipe_status_map}
                  defaultValue={mem_recipe_status_map.filter((item) => item.value === formData.delicious)[0]}
                  formKey="delicious"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>  
              
                
              <Grid size={12}>
                <LexicalEditor value={formData.notes} onChange={handleFormChange} formKey="notes" label="Detail" height="750px"/>
              </Grid>  
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/extra/foodrecipe'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>           
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;