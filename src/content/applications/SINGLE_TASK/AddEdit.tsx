import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useMemo, use } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import CustomDatePicker             from '../../../components/Form/CustomDatePickers';
import MultiButton                  from "../../../components/Form/MultiButton"
import {SingleTaskFormIntialState}  from "../../../utility/function/defaultData"

import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';

import { SingleTaskFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';

import {createSelectMap}                from '../../../utility/function/main';
import {SingleTaskRowSampleInterface} from 'src/utility/types/data_types';
import dayjs                           from "dayjs";


const CollapsibleForm = () => {

  const  {secondary,table,setTable}              = usePaginationContext();

  const { status:single_task_status,priority:single_task_priority,type:single_task_type } = secondary;

  const singleTaskPriority      = createSelectMap(single_task_priority,"array")
  const memSingleTaskPriority   = useMemo(() => singleTaskPriority, []);


  const singleTaskType         = createSelectMap(single_task_type,"array")
  const memSingleTaskType      = useMemo(() => singleTaskType, []);


  const singleTaskStatus        = createSelectMap(single_task_status,"array")
  const memSingleTaskStatus     = useMemo(() => singleTaskStatus, []);

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(SingleTaskFormIntialState);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<SingleTaskFormStateInterface>  = useFetch <SingleTaskFormStateInterface>(edit_page_id ?`schedule/stask/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/goals/single_task'))
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
      setTable(prev => success ?[...prev.map((item:SingleTaskRowSampleInterface) => item.id === data.id?data:item),data]:prev);
  }, [editResponse]);


  useEffect(() => {
    if (Object.keys(fetchEditData).length > 0) {
      setFormData({...fetchEditData});
    }
  }, [fetchEditData]);

  const handleFormChange = useCallback((key, value) => {
    if (key === 'date') {
      value = dayjs(value).format('YYYY-MM-DD');
    }
    setFormData((prev) => ({...prev,[key]: value}));
  },[]);
  
  const handleSave = async () => {
    const { id, ...dataToBeSent } = formData; // Destructure once
    if (edit_page_id) {
      await editData(`schedule/stask/${edit_page_id}/`, formData);
    }else{
      await postData("schedule/stask/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(SingleTaskFormIntialState)
  };

  return (
      <Card>
        <CardHeader title={`Single Task ${edit_page_id?'Edit':'Insert'} Form`} />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>

              <Grid size={6}>
                <CustomDatePicker
                  label="Deadline"
                  value={formData.deadline}
                  // value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('deadline', newValue )}
                />
              </Grid>
              <Grid size={6} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Task Name"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  fullWidth
                />
              </Grid>
              
              <Grid size={4}>
                <StaticAutocomplete
                  label="Task Type"
                  options={memSingleTaskType}
                  defaultValue={memSingleTaskType.filter((item) => item.value === formData.type)[0]}
                  formKey="type"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Task Status"
                  options={memSingleTaskStatus}
                  defaultValue={memSingleTaskStatus.filter((item) => item.value === formData.status)[0]}
                  formKey="status"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>  
              <Grid size={4}>
                <StaticAutocomplete
                  label="Priority"
                  options={memSingleTaskPriority}
                  defaultValue={memSingleTaskPriority.filter((item) => item.value === formData.priority)[0]}
                  formKey="priority"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>  
            
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Note"/>
              </Grid>    

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/goals/single_task'}/>
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