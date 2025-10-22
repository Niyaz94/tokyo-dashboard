import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { todayFormFields } from "./config";
import {TodayFormIntialStateInterface as FormIntialState}  from "../../../utility/function/defaultData"

const TodayAddEdit = () => {
  const {
    formData, handleFormChange, handleSave, setPageRedirect,
    open, message, severity, closeSnackbar, isEdit
  } = useAddEditPage({
    fetchUrl: (id) => `notes/daily/${id}`,
    postUrl: "notes/daily/",
    editUrl: (id) => `notes/daily/${id}/`,
    initialState: FormIntialState,
    onSuccessRedirect: "/personal/today"
  });

  const saveReturn = () => { setPageRedirect(true); handleSave(); };
  const saveContinue = () => { setPageRedirect(false); handleSave(); };

  return (
    <FormLayout
      title="Today Form"
      onSaveReturn={saveReturn}
      onSaveContinue={saveContinue}
      isEdit={isEdit}
      onSuccessRedirect="/personal/today"
      snackbar={{ open, message, severity, onClose: closeSnackbar }}
    >
      {todayFormFields.map((field, i) => (
        <FieldRenderer key={i} field={field} formData={formData} handleFormChange={handleFormChange} />
      ))}
    </FormLayout>
  );
};

export default TodayAddEdit;