import { useState,useEffect,useCallback,useRef,useMemo } from 'react';
import { useNavigate,useParams }    from 'react-router-dom';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import { filterIdeaStatusOptions } from '../../../utility/function/data';
import {createSelectMap}                from '../../../utility/function/main';


import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {
  CustomSnackbar,MultiButton,CustomDatePicker,StaticAutocomplete,FileUpload
}       from '../../../components/Form';

import {TomorrowSingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';
import { usePostAPI, useEditAPI, useFetch, FetchData,useSnackbar }  from "../../../utility/customHook";
import {IdeaFormIntialState}   from "../../../utility/function/defaultData"
import {IdeaFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';


import {usePageContext as usePage}      from '../../../store/context/pageContext';


const CollapsibleForm = () => {
  const {open,message,severity,showSnackbar,closeSnackbar} = useSnackbar();

  const  {setTable,pageDefault,secondary} = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(IdeaFormIntialState);

  const selectDefaultValue = edit_page_id && pageDefault?.date?.value ? pageDefault.date : null;

  const {type:idea_types} = secondary;



  const idea_status_map         = createSelectMap(filterIdeaStatusOptions.map(row=>row["id"]),"array")
  const mem_idea_status_map     = useMemo(() => idea_status_map, []);

  
  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`schedule/idea/${edit_page_id}`: null,{});
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
      await editData(`schedule/idea/${edit_page_id}/`, formData);
    }else{
      await postData("schedule/idea/", dataToBeSent,"FORM");
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
            navigate('/improvment/idea');
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
    setFormData(IdeaFormIntialState)
  };

  return (
      <Card>
        <CardHeader title="Ideas" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>
              <Grid size={4} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Idea Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={4} >
                <TextField
                    label={"Success Rate (%)"}
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={formData.successRate}
                    onChange={(e) =>
                      handleFormChange("successRate", e.target.value)
                    }
                    margin="dense"
                    slotProps={{
                      inputLabel: { shrink: true },
                      htmlInput: { max: 100, min: 0, step: 1 }
                    }}
                />
              </Grid>
              <Grid size={4} >
                <CustomDatePicker
                  label="Deadline"
                  value={formData.deadline}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('deadline', newValue )}
                />
              </Grid>
              <Grid size={6}>
                <StaticAutocomplete
                  label="Idea Status"
                  options={mem_idea_status_map}
                  defaultValue={mem_idea_status_map.filter((item) => item.value === formData.status)[0]}
                  formKey="status"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={6}>
                <StaticAutocomplete
                  label="Idea Type"
                  options={idea_types}
                  defaultValue={idea_types.filter((item) => item.value === formData.type)[0]}
                  formKey="type"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                  extraButton={true}
                  buttonUrl={'/secondary/idea_type/add'}
                />
              </Grid>  
              <Grid size={6}>
                <LexicalEditor value={formData.detail} onChange={handleFormChange} formKey="detail" label="Detail"/>
              </Grid> 
              <Grid size={6}>
                <LexicalEditor value={formData.howToAchieved} onChange={handleFormChange} formKey="howToAchieved" label="How To Impliment the Idea?" />
              </Grid> 
              
              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/improvment/idea'}/>
                <CustomSnackbar open={open} message={message} severity={severity} onClose={closeSnackbar}/>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
  );
};
export default CollapsibleForm;