import { usePostAPI, useEditAPI, useFetch, FetchData }         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import CustomDatePicker             from '../../../components/Form/CustomDatePicker';
import MultiButton                  from "../../../components/Form/MultiButton"
import {ExpenseFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"

import { useSelector }              from 'react-redux';
import StaticAutocomplete           from '../../../components/Form/StaticAutocomplete';


import { RootState }                    from '../../../store/Reducer';
import { ExpenseFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';


import {ActivitySingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';


const CollapsibleForm = () => {


  const  {setTable,secondary}               = usePage();
  const { type:expense_types, currency:currency_types } = secondary;
  
  // console.log("expense_types",expense_types)
  const expenseTypeMap = expense_types.map((row) => ({"label":row[1],"value":row[0]}));
  const currencyTypeMap = currency_types.map((row) => ({"label":row[1],"value":row[0]}));


  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);
  const dailyData               = useSelector((state: RootState) => state.daily.data);


  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`notes/expense/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();

  const saveReturn=()=>{
    handleSave().then(()=>navigate('/management/expense'))
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
      console.log("editResponse",data)
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
      await editData(`notes/expense/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("notes/expense/", dataToBeSent);
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

              <Grid size={6}>
                <StaticAutocomplete
                  label="Select Expense Type"
                  options={expenseTypeMap}
                  defaultValue={expenseTypeMap.filter(({label,value}) => value == Number(formData.type))[0]}
                  formKey="type"
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid size={6}>
                <StaticAutocomplete
                  label="Select Currency Type"
                  defaultValue={currencyTypeMap.filter((item) => item.value === formData.currency)[0]}
                  options={currencyTypeMap}
                  formKey="currency"
                  onChange={handleFormChange}
                />
              </Grid>
              
              <Grid size={6} >
                <CustomDatePicker
                  label="Date"
                  value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('date', newValue )}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  label={'Expense Amount'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    handleFormChange('amount', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10000, min: 0, step: 1 }
                  }}
                />
              </Grid>
              
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Notes"/>
              </Grid> 

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/management/expense'}/>
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