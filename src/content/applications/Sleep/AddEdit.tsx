import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { sleepFormFields } from "./config";
import { SleepFormStateInterface } from '../../../utility/types/Page';
import {sleepFormIntialState} from "../../../utility/function/defaultData"

const AddEdit =  ()  => {

  const {formData, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit
  } = useAddEditPage<SleepFormStateInterface>({
    fetchUrl: (id) => `notes/sleep/${id}`,
    postUrl: "notes/sleep/",
    editUrl: (id) => `notes/sleep/${id}/`,
    initialState: sleepFormIntialState,
    onSuccessRedirect: "/personal/sleep"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  return (
    <FormLayout
      title="Sleep Form"
      onSaveReturn={saveReturn}
      onSaveContinue={saveContinue}
      isEdit={isEdit}
      onSuccessRedirect="/personal/sleep"
      snackbar={{ open, message, severity, onClose: closeSnackbar }}
    >
      {sleepFormFields.map((field, i) => (
        <FieldRenderer key={i} field={field} formData={formData} handleFormChange={handleFormChange} isEdit={isEdit} />
      ))}
    </FormLayout>
  );
};

export default AddEdit;