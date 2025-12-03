import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useMemo, use } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {StaticAutocomplete,DynamicAutocomplete,MultiButton}             from '../../../components/Form';
import {TaskFormIntialState}  from "../../../utility/function/defaultData"


import { TaskFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';


import {createSelectMap,goalSearch,monthlySearch}                from '../../../utility/function/main';
import {SingleTaskRowSampleInterface} from 'src/utility/types/data_types';
import dayjs                           from "dayjs";


const CollapsibleForm = () => {

  const  {secondary,table,setTable,pageDefault}              = usePaginationContext();

  const { status:task_status,priority:single_task_priority,type:single_task_type } = secondary;

  // const singleTaskPriority      = createSelectMap(single_task_priority,"type3")
  // const memSingleTaskPriority   = useMemo(() => singleTaskPriority, []);
  // const singleTaskType         = createSelectMap(single_task_type,"object")
  // const memSingleTaskType      = useMemo(() => singleTaskType, []);


  const taskStatus        = createSelectMap(task_status,"type3")
  const memTaskStatus     = useMemo(() => taskStatus, []);

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(TaskFormIntialState);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<TaskFormStateInterface>  = useFetch <TaskFormStateInterface>(edit_page_id ?`schedule/task/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();


  const selectDefaultGoalValue = edit_page_id && pageDefault?.goal?.value ? pageDefault.goal : null;
  const selectDefaultMonthValue = edit_page_id && pageDefault?.month?.value ? pageDefault.month : null;


  const saveReturn=()=>{
    handleSave().then(()=>navigate('/goals/task'))
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
      await editData(`schedule/task/${edit_page_id}/`, formData);
    }else{
      await postData("schedule/task/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(TaskFormIntialState)
  };

  return (
      <Card>
        <CardHeader title={`Task ${edit_page_id?'Edit':'Insert'} Form`} />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>


              <Grid size={4} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Task Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={4} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Task Tag"
                  value={formData.tag}
                  onChange={(e) => handleFormChange('tag', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={4}>
                <StaticAutocomplete
                  label="Task Status"
                  options={memTaskStatus}
                  defaultValue={memTaskStatus.filter((item) => item.value === formData.status)[0]}
                  formKey="status"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid size={6}>
                <DynamicAutocomplete
                  label="Select The Goal"
                  defaultValue={selectDefaultGoalValue}
                  fetchOptions={goalSearch}
                  formKey="goal"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={6}>
                <DynamicAutocomplete
                  label="Select The Month"
                  defaultValue={selectDefaultMonthValue}
                  fetchOptions={monthlySearch}
                  formKey="month"
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  label={'Dedicated Success Percentage'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.percentage}
                  onChange={(e) =>
                    handleFormChange('percentage', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 100, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label={'Result Success Percentage'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.result}
                  onChange={(e) =>
                    handleFormChange('result', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 100, min: 0, step: 1 }
                  }}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  label={'Prize Amount'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.prizeAmount}
                  onChange={(e) =>
                    handleFormChange('prizeAmount', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label={'Dedicated Time in Minutes'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.dailyTime}
                  onChange={(e) =>
                    handleFormChange('dailyTime', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                />
              </Grid>

              <Grid size={12}>
                <LexicalEditor value={formData.description} onChange={handleFormChange} formKey="description" label="Task Description"/>
              </Grid>   
              <Grid size={12}>
                <LexicalEditor value={formData.resultDescription} onChange={handleFormChange} formKey="resultDescription" label="Task Conclusion"/>
              </Grid>   
              <Grid size={12}>
                <LexicalEditor value={formData.prizeDetail} onChange={handleFormChange} formKey="prizeDetail" label="Task Prize"/>
              </Grid>    

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/goals/task'}/>
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