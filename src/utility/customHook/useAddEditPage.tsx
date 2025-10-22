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
}

export function useAddEditPage<T>({fetchUrl, postUrl, editUrl, initialState, setTable, onSuccessRedirect}: AddEditOptions<T>) {
  const { id } = useParams();
  const isEdit = !!id;
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { open, message, severity, showSnackbar, closeSnackbar } = useSnackbar();

  const { data: fetchedData } = useFetch<T>(isEdit ? fetchUrl(id) : null, {});
  const { postData, response, error: postError } = usePostAPI();
  const { editData, response: editResponse, error: editError } = useEditAPI();

  const [formData, setFormData] = useState<T>(initialState);
  const [pageRedirect, setPageRedirect] = useState(false);

  const handleFormChange = useCallback(
    (key: keyof T, value: any) => setFormData(prev => ({ ...prev, [key]: value })),
    []
  );

  const handleSave = async () => {
    const { id, ...payload } = formData as any;
    if (isEdit) await editData(editUrl(id), formData);
    else await postData(postUrl, payload);
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

    if (postSuccess || editSuccess) {
      showSnackbar(postSuccess ? "Submitted successfully!" : "Edited successfully!", "success");
      setTimeout(() => {
        if (pageRedirect && onSuccessRedirect) navigate(onSuccessRedirect);
      }, 1500);
    } else if (postError || editError) {
      showSnackbar(postError || editError, "error");
    }
  }, [response, editResponse, postError, editError]);

  return {formData,setFormData,handleFormChange,handleSave,open,message,severity,closeSnackbar,setPageRedirect,isEdit,};
}
