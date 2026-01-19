import { useState,useMemo,useEffect } from 'react';
import { inputFields } from "./config";
import { useAddEditPage,useTablePaginationHandlers}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import {DocumentFormIntial}  from "../../../utility/function/defaultData"
import { DocumentFormIRF } from '../../../utility/types/Page';
import {usePageContext as usePage}      from '../../../store/context/pageContext';

const CollapsibleForm = () => {

  const { page } = useTablePaginationHandlers('learn');
  
  const  {setTable,pageDefault,secondary} = usePage();
  const {type:learn_types } = secondary;
  const memLearnTypes      = useMemo(() => learn_types, []);
  const [pageName,setPageName] = useState<string>("learn_added");
  
  const {secrecy_level,...LearnFormIntial}= DocumentFormIntial
  const {
      formData,formErrors, handleFormChange, handleSave, setPageRedirect,
      open, message, severity, closeSnackbar, isEdit,responseData,actionState,orignalResponse
  } = useAddEditPage<Omit<DocumentFormIRF,'secrecy_level'>>({
      fetchUrl: (id) => `document/learn/${id}`,
      postUrl: "document/learn/",
      editUrl: (id) => `document/learn/${id}/`,
      initialState: LearnFormIntial,
      onSuccessRedirect: "/documents/learn",
      page_name: pageName,
      bodyType:"FORM"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  useEffect(() => {
      if (!actionState) 
        return;  
      
      if (isEdit) {
        setTable(prev =>
          prev.map(item =>
            item.id === responseData.id ? { ...responseData } : item
          )
        );
      } else {
        if (page === 0) {
          // WHAT IF PAGE LENGHT LESS THAN LIMIT, IT STILL REMOVE THE LAST ITEM
          const newEntry = { ...responseData };
          setTable(prev => [newEntry, ...prev.slice(0, -1)]);
        }
      }
    }, [actionState]);

  return (        
        <FormLayout
          title="Learn Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          page_name={pageName}
          isEdit={isEdit}
          onSuccessRedirect="/documents/learn"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          {inputFields({memLearnTypes}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default CollapsibleForm;