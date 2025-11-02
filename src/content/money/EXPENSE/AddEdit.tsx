import {ExpenseFormIntialState}  from "../../../utility/function/defaultData"
import { ExpenseFormIntialStateInterface } from '../../../utility/types/Page';
import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { expenseFormFields } from "./config";
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';
import { useState,useEffect,useCallback } from 'react';
import {axiosGetData} from '../../../utility/Axios'
import Grid from '@mui/material/Grid';
import CustomAlert                  from '../../../components/Custom/Alert';

const AddEdit =  ()  => {
  const  {secondary}               = usePage();
  const { type:expense_category,currency:expense_currency} = secondary;

  const {formData,formErrors, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit
  } = useAddEditPage<ExpenseFormIntialStateInterface>({
    fetchUrl: (id) => `money/expense/${id}`,
    postUrl: "money/expense/",
    editUrl: (id) => `money/expense/${id}/`,
    initialState: ExpenseFormIntialState,
    onSuccessRedirect: "/transactions/expense"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  const [alertData, setAlertData] = useState<{title:string,message:string,severity:'error' | 'warning' | 'info' | 'success',openDefault:boolean}>({title:"",message:"",severity:"success",openDefault:false});


  const checkRemainingAmount = () => {
    
    if (formData.category>0 && formData.currency>0)
      axiosGetData(`money/expense/total_expense/?categoryId=${formData.category}&currencyId=${formData.currency}&date=${formData.date}`).then((res) => {
        const {limit,expense,remaining,month} = res.data;
        if(limit==null || limit==0){
            setAlertData({...alertData,openDefault:false})
        }else if (Number(remaining) <= 0){
          setAlertData({title:"Limit Exceeded",message:`You have exceeded your limit for this category. You have used ${expense} out of ${limit} ${expense_currency.filter((item) => item.value === formData.currency)[0]?.label || ""} for ${month}.`,severity:"error",openDefault:true})
        }else if (Number(remaining) <= (0.1 * Number(limit))){
          setAlertData({title:"Warning",message:`You are close to your limit for this category. You have used ${expense} out of ${limit} ${expense_currency.filter((item) => item.value === formData.currency)[0]?.label || ""} for ${month}.`,severity:"warning",openDefault:true})
        }else{
          setAlertData({title:"Info",message:`You have used ${expense} out of ${limit} ${expense_currency.filter((item) => item.value === formData.currency)[0]?.label || ""} for ${month}.`,severity:"info",openDefault:true})
        }
      });
  }
  useEffect(() => {
    checkRemainingAmount();
  }, [formData.category,formData.date,formData.currency]);

  return (        
        <FormLayout
          title="Today Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          isEdit={isEdit}
          onSuccessRedirect="/transactions/expense"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          <Grid size={12}>
            {useCallback(() => <CustomAlert {...alertData} />, [alertData])()}
          </Grid>
          {expenseFormFields({expense_category,expense_currency}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default AddEdit;