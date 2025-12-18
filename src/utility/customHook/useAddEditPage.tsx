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
  const location = useLocation();
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
      }else{
        setFormData((prev) => ({...prev,[key]: value}));
      }

      // setFormData(prev => ({ ...prev, [key]: value }))
    },[]
  );

    const handleFormChange2 = useCallback((key, value) => {
    if (Array.isArray(key) && Array.isArray(value) && key.length === value.length) {
      key.forEach((k, index) => {
        setFormData((prev) => ({...prev,[k]: value[index]}));

      });
    }else{
      setFormData((prev) => ({...prev,[key]: value}));
    }
  },[]); 

  const handleSave = async () => {
    const { id, ...payload } = formData as any;
    if (isEdit) 
      await editData(editUrl(id), formData,bodyType);
    else 
      await postData(postUrl, payload,bodyType);
  };

  useEffect(() => {
    if (Object.keys(fetchedData || {}).length > 0) setFormData(fetchedData!);
  }, [fetchedData]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const postSuccess = response?.success;
    const editSuccess = editResponse?.success;

    setActionSate((isEdit ? editResponse?.success : response?.success) || false);

    if (postSuccess || editSuccess) {
      showSnackbar(postSuccess ? "Submitted successfully!" : "Edited successfully!", "success");
      setTimeout(() => {
        if (pageRedirect && onSuccessRedirect) navigate(onSuccessRedirect, {state:{page_name}});
      }, 1500);
    } else if (postError || editError) {
      showSnackbar(postError.message || editError.message, "error");

      const firstNonEmpty = (...objs: any[]) =>objs.find(obj => obj && Object.keys(obj).length > 0) || {};

      setFormErrors(firstNonEmpty(postError?.errors, editError?.errors));
    }
  }, [response, editResponse, postError, editError]);

  return {
    formData,formErrors,setFormData,handleFormChange,handleSave,
    open,message,severity,closeSnackbar,setPageRedirect,isEdit,actionState,
    responseData: isEdit ? editResponse?.data : response?.data,orignalResponse:fetchedData
    
  };
}
