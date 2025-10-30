import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { loanFormFields } from "./config";
import {LoanFormIntialState}  from "../../../utility/function/defaultData"
import { LoanFormIntialStateInterface } from "../../../utility/types/Page";
import { usePaginationContext as usePage} from '../../../store/context/paginationContext';

const AddEditComponent =  ()  => {

  const  {secondary}               = usePage();
  const { type:loanTypes, currency:currencyTypes } = secondary;

  const {formData,formErrors, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit
  } = useAddEditPage<LoanFormIntialStateInterface>({
    fetchUrl: (id) => `money/loan/${id}`,
    postUrl: "money/loan/",
    editUrl: (id) => `money/loan/${id}/`,
    initialState: LoanFormIntialState,
    onSuccessRedirect: "/transactions/loan"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  return (
    <FormLayout
      title="Loan Form"
      onSaveReturn={saveReturn}
      onSaveContinue={saveContinue}
      isEdit={isEdit}
      onSuccessRedirect="/transactions/loan"
      snackbar={{ open, message, severity, onClose: closeSnackbar }}
    >
      {loanFormFields({loanTypes,currencyTypes}).map((field, i) => (
        <FieldRenderer 
          key={i} 
          field={field} 
          error={formErrors[field.key] || []} 
          formData={formData} 
          handleFormChange={handleFormChange} 
        />
      ))}
    </FormLayout>
  );
};
export default AddEditComponent;