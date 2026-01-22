// hooks/useAddEditPage.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { usePostAPI, useEditAPI, useFetch, useSnackbar } from "./";

interface AddEditOptions<T> {
  fetchUrl: (id: string) => string;
  postUrl: string;
  editUrl: (id: string) => string;
  initialState: T;
  setTable?: (updater: (prev: T[]) => T[]) => void;
  onSuccessRedirect?: string;
  page_name?: string;
  bodyType?:string;
}

export function useAddEditPage<T>({fetchUrl, postUrl, editUrl, initialState, setTable, onSuccessRedirect,page_name="",bodyType="JSON"}: AddEditOptions<T>) {
  const { id } = useParams();
  const isEdit = !!id;
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const { open, message, severity, showSnackbar, closeSnackbar } = useSnackbar();

  const { data: fetchedData } = useFetch<T>(isEdit ? fetchUrl(id) : null, {});
  const { postData, response, error: postError } = usePostAPI();
  const { editData, response: editResponse, error: editError } = useEditAPI();
  const [actionState, setActionSate] = useState<boolean>(false);

  const [formData, setFormData] = useState<T>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [pageRedirect, setPageRedirect] = useState(false);

  const handleFormChange = useCallback(
    (key: keyof T, value: any) => {

      if (Array.isArray(key) && Array.isArray(value) && key.length === value.length) {
        key.forEach((k, index) => {
          setFormData((prev) => ({...prev,[k]: value[index]}));

        });
      }
      // else if(typeof value === 'object' && value !== null){
      //   setFormData((prev) => ({...prev,[key]: value.value}));
      // }
      else{
        setFormData((prev) => ({...prev,[key]: value}));
      }

      // setFormData(prev => ({ ...prev, [key]: value }))
    },[]
  );

  const handleSave = async () => {
    const { id, ...payload } = formData as any;
    if (isEdit) {
      const submit_form_data=Object.assign({}, formData) 
      Object.keys(submit_form_data).forEach(function(key, index) {
        if(typeof submit_form_data[key] === 'object' && submit_form_data[key] !== null && submit_form_data[key]?.value){
          submit_form_data[key] = submit_form_data[key]?.value
        }
      });
      await editData(editUrl(id), submit_form_data,bodyType);

    }
    else 
      await postData(postUrl, payload,bodyType);
  };

  useEffect(() => {
    if (Object.keys(fetchedData || {}).length > 0) {
      console.log("useEffect (inside useAddEditPage) run for fetchedData")

      // Object.entries(fetchedData).map(([k, v], i) => {})
      // Object.keys(fetchedData).forEach(function(key, index) {
      //   if(typeof fetchedData[key] === 'object' && fetchedData[key] !== null){
      //     fetchedData[key] = fetchedData[key]?.value || "not found"

      //   }
      // });
      setFormData(fetchedData);
    }
      
  }, [fetchedData]);

  useEffect(() => {
    console.log(
      "useEffect (inside useAddEditPage) run for response, editResponse, postError, editError",
      response, editResponse, postError, editError
    )

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const postSuccess = response?.success;
    const editSuccess = editResponse?.success;


    if (postSuccess || editSuccess) {
      console.log("useEffect (inside useAddEditPage) success")

      setActionSate((isEdit ? editSuccess : postSuccess) || false);
      showSnackbar(postSuccess ? "Submitted successfully!" : "Edited successfully!", "success");
      setTimeout(() => {
        if (pageRedirect && onSuccessRedirect) navigate(onSuccessRedirect, {state:{page_name}});
      }, 1500);
    } else if (postError || editError) {
      console.log("useEffect (inside useAddEditPage) fail")
      setActionSate(false);

      showSnackbar(postError.message || editError.message, "error");

      const firstNonEmpty = (...objs: any[]) =>objs.find(obj => obj && Object.keys(obj).length > 0) || {};

      setFormErrors(firstNonEmpty(postError?.errors, editError?.errors));
    }
  }, [response, editResponse, postError, editError]);

  return {
    formData,formErrors,setFormData,handleFormChange,handleSave,
    open,message,severity,closeSnackbar,setPageRedirect,isEdit,actionState,setActionSate,
    responseData: isEdit ? editResponse?.data : response?.data,orignalResponse:fetchedData
    
  };
}
