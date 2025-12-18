import { useState,useMemo,useEffect } from 'react';
import { inputFields } from "./config";
import { useAddEditPage,useTablePaginationHandlers}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import {DocumentFormIntial}  from "../../../utility/function/defaultData"
import { DocumentFormIRF } from '../../../utility/types/Page';
import {usePageContext as usePage}      from '../../../store/context/pageContext';

const CollapsibleForm = () => {

  const { page } = useTablePaginationHandlers('document');
  
  const  {setTable,pageDefault,secondary} = usePage();
  const {type:document_types } = secondary;
  const memDocumentTypes      = useMemo(() => document_types, []);
  const [pageName,setPageName] = useState<string>("document_added");
  
  const {
      formData,formErrors, handleFormChange, handleSave, setPageRedirect,
      open, message, severity, closeSnackbar, isEdit,responseData,actionState,orignalResponse
  } = useAddEditPage<DocumentFormIRF>({
      fetchUrl: (id) => `document/document/${id}`,
      postUrl: "document/document/",
      editUrl: (id) => `document/document/${id}/`,
      initialState: DocumentFormIntial,
      onSuccessRedirect: "/documents/document",
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
          const newEntry = { ...responseData };
          setTable(prev => [newEntry, ...prev.slice(0, -1)]);
        }
      }
    }, [actionState]);

  return (        
        <FormLayout
          title="Document Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          page_name={pageName}
          isEdit={isEdit}
          onSuccessRedirect="/documents/document"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          {inputFields({memDocumentTypes}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default CollapsibleForm;