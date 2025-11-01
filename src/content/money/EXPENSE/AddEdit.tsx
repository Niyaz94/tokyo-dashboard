import { usePostAPI, useEditAPI, useFetch, FetchData }         from "../../../utility/customHook";

import React, { useState,useEffect,useCallback, use } from 'react';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid';

import { useNavigate,useParams }    from 'react-router-dom';
import LexicalEditor                from '../../../components/Custom/Lexical/Editor';
import {ExpenseFormIntialState as FormIntialState}  from "../../../utility/function/defaultData"

import { useSelector }              from 'react-redux';
import {StaticAutocomplete,CustomSwitch,MultiButton,CustomDatePicker}           from '../../../components/Form';
import CustomAlert                  from '../../../components/Custom/Alert';

import {axiosGetData} from '../../../utility/Axios'

import { RootState }                    from '../../../store/Reducer';
import { ExpenseFormIntialStateInterface as FormIntialStateInterface } from '../../../utility/types/Page';
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';
import { ExpenseType }   from '../../../utility/function/data';


import {ActivitySingleSampleInterface as SingleSampleInterface}  from 'src/utility/types/data_types';


const CollapsibleForm = () => {


  const  {setTable,secondary}               = usePage();
  const { type:expense_types, currency:currency_types } = secondary;

  const navigate                = useNavigate();
  const { id:edit_page_id }     = useParams();
  const [formData, setFormData] = useState(FormIntialState);
  const dailyData               = useSelector((state: RootState) => state.daily.data);

  const [alertData, setAlertData] = useState<{title:string,message:string,severity:'error' | 'warning' | 'info' | 'success',openDefault:boolean}>({title:"",message:"",severity:"success",openDefault:false});


  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormIntialStateInterface>  = useFetch <FormIntialStateInterface>(edit_page_id ?`money/expense/${edit_page_id}`: null,{});
  const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData}        = useEditAPI();



  const saveReturn=()=>{
    handleSave().then(()=>navigate('/transactions/expense'))
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
      await editData(`money/expense/${edit_page_id}/`, formData);
    }else{
      console.log("formData",formData)
      await postData("money/expense/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(FormIntialState)
  };

  const checkRemainingAmount = () => {
    
    if (formData.category>0 && formData.currency>0)
      axiosGetData(`money/expense/total_expense/?categoryId=${formData.category}&currencyId=${formData.currency}&date=${formData.date}`).then((res) => {
        const {limit,expense,remaining,month} = res.data;
        if(limit==null || limit==0){
            setAlertData({...alertData,openDefault:false})
        }else if (Number(remaining) <= 0){
          setAlertData({title:"Limit Exceeded",message:`You have exceeded your limit for this category. You have used ${expense} out of ${limit} ${currency_types.filter((item) => item.value === formData.currency)[0]?.label || ""} for ${month}.`,severity:"error",openDefault:true})
        }else if (Number(remaining) <= (0.1 * Number(limit))){
          setAlertData({title:"Warning",message:`You are close to your limit for this category. You have used ${expense} out of ${limit} ${currency_types.filter((item) => item.value === formData.currency)[0]?.label || ""} for ${month}.`,severity:"warning",openDefault:true})
        }else{
          setAlertData({title:"Info",message:`You have used ${expense} out of ${limit} ${currency_types.filter((item) => item.value === formData.currency)[0]?.label || ""} for ${month}.`,severity:"info",openDefault:true})
        }
      });
  }
  useEffect(() => {
    checkRemainingAmount();
  }, [formData.category,formData.date,formData.currency]);

  return ( 
      <Card>
        <CardHeader title="Input Fields" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>

              <Grid size={12}>
                {useCallback(() => <CustomAlert {...alertData} />, [alertData])()}
              </Grid>


              <Grid size={6}>
                <StaticAutocomplete
                  label="Select Expense Type"
                  options={expense_types}
                  defaultValue={expense_types.filter(({label,value}) => value == Number(formData.category))[0]}
                  formKey="category"
                  onChange={(key, value) => {
                    handleFormChange(key, value);   
                  }}
                />
              </Grid>

              <Grid size={6}>
                <StaticAutocomplete
                  label="Select Currency Type"
                  defaultValue={currency_types.filter((item) => item.value === formData.currency)[0]}
                  options={currency_types}
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
              
              <Grid size={6}>
                <StaticAutocomplete
                  label="Spending Type"
                  defaultValue={ExpenseType.filter((item) => item.value === formData.spendingType)[0]}
                  options={ExpenseType}
                  formKey="spendingType"
                  onChange={handleFormChange}
                  showValueInLabel={false}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  label={'Wasted Amount'}
                  variant="outlined"
                  required={true}
                  fullWidth
                  type="number"
                  value={formData.wastedAmount}
                  onChange={(e) =>
                    handleFormChange('wastedAmount', e.target.value)
                  }
                  margin="dense"
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 1000000, min: 0, step: 1 }
                  }}
                />
              </Grid>

              <Grid size={12}>
                <CustomSwitch 
                  value={formData.consider}
                  onChange={(newValue) => handleFormChange('consider', newValue)}
                  label="Consider in the Savings Calculation"
                />
              </Grid>  
              
              
              <Grid size={12}>
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" label="Notes"/>
              </Grid> 

              <Grid size={12}>
                <MultiButton type={edit_page_id ?"edit":"insert"} saveContinue={saveContinue} saveReturn={saveReturn} returnUrl={'/transactions/expense'}/>
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