import { usePostAPI, useEditAPI, useFetch, FetchData }         from "../../../utility/customHook";

import { useState,useEffect,useCallback } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import {CurrencyFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"


import {CurrencyFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import {useTaskStatus as usePage}                  from '../../../store/context/taskStatusContext';
import {MultiButton}       from '../../../components/Form';



const CollapsibleForm = () => {


  const  {setTable}               = usePage();


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);


  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`money/currency/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/transactions/currency'))
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
      setTable(prev => success ?prev.map((item) =>item.id === data.id ? data : item):prev);
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
      await editData(`money/currency/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("money/currency/", dataToBeSent);
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

              
              <Grid size={4} sx={{paddingTop: '8px'}}>
                <TextField
                  label="Type Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={4} sx={{}}>
                <TextField
                  label={'Start Day of Expense Cycle'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.startDay}
                  onChange={(e) =>
                    handleFormChange('startDay', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 31, min: 0, step: 1 }
                  }}
                />
              </Grid>

              <Grid size={4}>
                <TextField
                  label={'Maximum Expense Amount'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.maxAmount}
                  onChange={(e) =>
                    handleFormChange('maxAmount', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 1000000, min: 0, step: 1 }
                  }}
                />
              </Grid>

              
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Note"/>
              </Grid> 

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/transactions/currency'}/>
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