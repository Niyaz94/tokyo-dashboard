import { 
  usePostAPI, useEditAPI, useFetch, FetchData 
}         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback,useMemo, use } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Grid from '@mui/material/Grid';


import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';

import {StaticAutocomplete,DynamicAutocomplete,MultiButton,CustomDatePicker,CustomSnackbar}             from '../../../components/Form';
import {GoalFormIntialState}  from "../../../utility/function/defaultData"


import { GoalFormStateInterface } from '../../../utility/types/Page';
import {usePaginationContext}                  from '../../../store/context/paginationContext';


import {createSelectMap,goalSearch,monthlySearch}                from '../../../utility/function/main';
import {SingleTaskRowSampleInterface} from 'src/utility/types/data_types';
import dayjs                           from "dayjs";


const CollapsibleForm = () => {

  const  {secondary,table,setTable,pageDefault}              = usePaginationContext();

  const { goal_status,goal_level } = secondary;

  const memGoalStatus     = useMemo(() => createSelectMap(goal_status,"array"), []);
  const memGoalLevel     = useMemo(() => createSelectMap(goal_level,"array"), []);

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(GoalFormIntialState);

  const { data:fetchEditData,success:editReturnSuccess}: FetchData<GoalFormStateInterface>  = useFetch <GoalFormStateInterface>(edit_page_id ?`schedule/goal/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();


  //const selectDefaultGoalValue = edit_page_id && pageDefault?.goal?.value ? pageDefault.goal : null;
  //const selectDefaultMonthValue = edit_page_id && pageDefault?.month?.value ? pageDefault.month : null;


  const saveReturn=()=>{
    handleSave().then(()=>navigate('/goals/goals'))
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
      await editData(`schedule/goal/${edit_page_id}/`, formData);
    }else{
      await postData("schedule/goal/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(GoalFormIntialState)
  };

  return (
      <Card>
        <CardHeader title={`Goal ${edit_page_id?'Edit':'Insert'} Form`} />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>


               <Grid size={6} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Goal Name"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={6} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Prize Amount"
                  value={formData.prizeAmount}
                  onChange={(e) => handleFormChange('prizeAmount', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={6}>
                <CustomDatePicker
                  label="Start Date"
                  value={formData.startDate}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('startDate', newValue )}
                />
              </Grid>

              <Grid size={6}>
                <CustomDatePicker
                  label="End Date"
                  value={formData.endDate}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('endDate', newValue )}
                />
              </Grid>

              <Grid size={4}>
                <StaticAutocomplete
                  label="Goal Status"
                  options={memGoalStatus}
                  defaultValue={memGoalStatus.filter((item) => item.value === formData.currentStatus)[0]}
                  formKey="currentStatus"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Importance Level"
                  options={memGoalLevel}
                  defaultValue={memGoalLevel.filter((item) => item.value === formData.importanceLevel)[0]}
                  formKey="importanceLevel"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid size={4}>
                <StaticAutocomplete
                  label="Difficulty Level"
                  options={memGoalLevel}
                  defaultValue={memGoalLevel.filter((item) => item.value === formData.difficultyLevel)[0]}
                  formKey="difficultyLevel"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              
              <Grid size={6}>
                <LexicalEditor value={formData.goalDetail} onChange={handleFormChange} formKey="goalDetail" label="Goal Detail"/>
              </Grid>   
              <Grid size={6}>
                <LexicalEditor value={formData.planToAchieved} onChange={handleFormChange} formKey="planToAchieved" label="How to Achieved"/>
              </Grid>   
              <Grid size={6}>
                <LexicalEditor value={formData.goalResult} onChange={handleFormChange} formKey="goalResult" label="Final Result"/>
              </Grid> 
              <Grid size={6}>
                <LexicalEditor value={formData.prizeDetail} onChange={handleFormChange} formKey="prizeDetail" label="Prize Detail"/>
              </Grid>      

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/goals/goals'}/>
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