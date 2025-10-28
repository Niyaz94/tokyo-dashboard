import { useAddEditPage}         from "../../../utility/customHook";
import {FormLayout,FieldRenderer}       from '../../../components/Form';
import { todayFormFields } from "./config";
import {todayFormIntialState}  from "../../../utility/function/defaultData"
import { TodayFormIntialStateInterface } from "../../../utility/types/Page";

const TodayAddEdit =  ()  => {

  const {formData,formErrors, handleFormChange, handleSave, setPageRedirect,open, message, severity, closeSnackbar, isEdit
  } = useAddEditPage<TodayFormIntialStateInterface>({
    fetchUrl: (id) => `notes/daily/${id}`,
    postUrl: "notes/daily/",
    editUrl: (id) => `notes/daily/${id}/`,
    initialState: todayFormIntialState,
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
        <FieldRenderer key={i} field={field} error={formErrors[field.key] || []} formData={formData} handleFormChange={handleFormChange} />
      ))}
    </FormLayout>
  );
};

export default TodayAddEdit;