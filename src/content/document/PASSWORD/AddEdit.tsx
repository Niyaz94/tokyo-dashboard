import { useState,useMemo,useEffect } from 'react';
import { inputFields } from "./config";
import { useAddEditPage,useTablePaginationHandlers}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import {PasswordFormIntial}  from "../../../utility/function/defaultData"
import { PasswordFormIRF } from '../../../utility/types/Page';
import {usePageContext as usePage}      from '../../../store/context/pageContext';

const CollapsibleForm = () => {

  const { page,limit } = useTablePaginationHandlers('password');
  
  const  {table,setTable,secondary} = usePage();
  const {type:password_types } = secondary;
  const memPasswordTypes      = useMemo(() => password_types, []);
  const [pageName,setPageName] = useState<string>("password_added");
  
  const {
      formData,formErrors, handleFormChange, handleSave, setPageRedirect,
      open, message, severity, closeSnackbar, isEdit,responseData,actionState,setActionSate
  } = useAddEditPage<PasswordFormIRF>({
      fetchUrl: (id) => `document/password/${id}`,
      postUrl: "document/password/",
      editUrl: (id) => `document/password/${id}/`,
      initialState: PasswordFormIntial,
      onSuccessRedirect: "/documents/password",
      page_name: pageName,
      bodyType:"JSON"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  // I'm not sure about the full logic for this page, for Password Page it work fine but there were many issues with other pages
  useEffect(() => {
      if(Object.keys(responseData).length<=0 || !actionState){ 
        return;
      }
      if (isEdit) {
        setTable(prev =>prev.map(item =>item.id === responseData.id ? { ...responseData } : item));
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

        }
      }
      setActionSate(false)//without this line it does not work.
    }, [actionState]);

  return (        
        <FormLayout
          title="Password Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          page_name={pageName}
          isEdit={isEdit}
          onSuccessRedirect="/documents/password"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          {inputFields({memPasswordTypes}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default CollapsibleForm;