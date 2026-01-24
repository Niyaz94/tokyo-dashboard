import {ExpenseFormIntialState}  from "../../../utility/function/defaultData"
import { ExpenseFormIntialStateInterface } from '../../../utility/types/Page';
import { useAddEditPage,useTablePaginationHandlers}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { expenseFormFields } from "./config";
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';
import { useState,useEffect,useCallback} from 'react';
import {axiosGetData} from '../../../utility/Axios'
import Grid from '@mui/material/Grid';
import CustomAlert                  from '../../../components/Custom/Alert';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween);


const AddEdit =  ()  => {

  const  {secondary,setTable,setSecondary}               = usePage();
  const { page,limit } = useTablePaginationHandlers('expense');
  
  const { type:expense_category,currency:expense_currency} = secondary;
  const [pageName,setPageName] = useState<string>("expense_added");

  const {
    formData,formErrors, handleFormChange, handleSave, setPageRedirect,setActionSate,
    open, message, severity, closeSnackbar, isEdit,responseData,actionState,orignalResponse
  } = useAddEditPage<ExpenseFormIntialStateInterface>({
    fetchUrl: (id) => `money/expense/${id}`,
    postUrl: "money/expense/",
    editUrl: (id) => `money/expense/${id}/`,
    initialState: ExpenseFormIntialState,
    onSuccessRedirect: "/transactions/expense",
    page_name: pageName
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  useEffect(() => {
    // if (!actionState) return;
    if(Object.keys(responseData).length<=0 || !actionState){ 
      return;
    }

    const { amount, currency_name, date, consider } = responseData;
    const parsedDate = dayjs(date);
    const numericAmount = Number(amount);
    const numericOriginalAmount = Number(orignalResponse.amount);

    const updateCurrencyDetail = (prev: any) => {
      return prev.currency_detail.map((item: any) => {
        const withinRange =
          parsedDate.isBetween(
            dayjs(item.start_date),
            dayjs(item.end_date),
            null,
            '[]'
          );

        if (item.name !== currency_name || !withinRange || !consider) {
          return item;
        }

        if (isEdit) {
          if (numericOriginalAmount !== numericAmount) {
            return {
              ...item,
              totalspend:
                item.totalspend - numericOriginalAmount + numericAmount,
            };
          }
          return item;
        }

        return {
          ...item,
          totalspend: item.totalspend + numericAmount,
        };
      });
    };

    // if (isEdit) {
    //   setTable(prev =>
    //     prev.map(item =>
    //       item.id === responseData.id ? { ...responseData } : item
    //     )
    //   );
    //   setSecondary(prev => ({...prev,currency_detail: updateCurrencyDetail(prev)}));
    // } else {
    //   if (page === 0) {
    //     const newEntry = { ...responseData };
    //     setTable(prev => [newEntry, ...prev.slice(0, -1)]);
    //   }
    //   setSecondary(prev => ({...prev,currency_detail: updateCurrencyDetail(prev)}));
    // }
    
      if (isEdit) {
        setTable(prev =>prev.map(item =>item.id === responseData.id ? { ...responseData } : item));
        setSecondary(prev => ({...prev,currency_detail: updateCurrencyDetail(prev)}));
      } else {
        if (page === 0 ) {
          const newEntry = { ...responseData };
          setTable(prev => {
            const id_list=prev.map(({id})=>id)
            if(!id_list.includes(newEntry.id)){
              return [newEntry, ...(prev.length+1>limit?prev.slice(0, -1):prev)]
            }else{
              return prev
            }
          });
          setSecondary(prev => ({...prev,currency_detail: updateCurrencyDetail(prev)}));
        }
      }
      setActionSate(false)//without this line it does not work.
  }, [actionState]);
 // I think this not usually correct

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
          page_name={pageName}
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