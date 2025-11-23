import {CurrencyLimitIS as IS}  from "../../../utility/function/defaultData"
import { CurrencyLimitFISI as FISI } from '../../../utility/types/Page';
import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { formFields } from "./config";
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';

const AddEdit =  ()  => {
  const  {secondary}               = usePage();
  const {currency} = secondary;

  const {formData,formErrors, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit
  } = useAddEditPage<FISI>({
    fetchUrl: (id) => `money/currency_limit/${id}`,
    postUrl: "money/currency_limit/",
    editUrl: (id) => `money/currency_limit/${id}/`,
    initialState: IS,
    onSuccessRedirect: "/transactions/currency_limit"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  return (        
        <FormLayout
          title="Today Form"
          onSaveReturn={saveReturn}
          onSaveContinue={saveContinue}
          isEdit={isEdit}
          onSuccessRedirect="/transactions/currency_limit"
          snackbar={{ open, message, severity, onClose: closeSnackbar }}
        >
          {formFields({currency}).filter(({fieldType})=>fieldType==="form").map((field, i) => {
            return (
            <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
          )
          })}
        </FormLayout>    
  );
};
export default AddEdit;