import { useState,useMemo } from 'react';
import { inputFields } from "./config";
import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import {DocumentFormIntial}  from "../../../utility/function/defaultData"
import { DocumentFormIRF } from '../../../utility/types/Page';
import {usePageContext as usePage}      from '../../../store/context/pageContext';

const CollapsibleForm = () => {

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

  return (        
        <FormLayout
          title="Document Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          page_name={pageName}
          isEdit={isEdit}
          onSuccessRedirect="/goals/single_task"
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