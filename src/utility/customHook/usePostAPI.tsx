import { useState, useEffect } from 'react';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
const usePostAPI =() => {

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading,  setLoading]  = useState<boolean>(true);
  const [success,  setSuccess]  = useState<boolean>(false);
  const [error,      setError]  = useState<string>('');


  const postData = async (url:string,body:any) => {

    setLoading(true);
    setSuccess(false);

    try {
      const preData = new FormData();
      for (const key in body){
        if(key.startsWith("file")){
          preData.append(key, body[key][0]);
        }else if(key.startsWith("date")){
          // if date and time is needed
          //preData.append(key, new Date(formData[key as keyof FORM_TYPE]).toLocaleString("en-CA",{hour12: false}).replace(",",""));
          preData.append(key, new Date(body[key]).toLocaleDateString("en-CA"));
        }else{
          preData.append(key, body[key].value ? body[key].value: body[key]);
        }
      }
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            // 'Content-Type': 'application/json',"content-type": "multipart/form-data"
        }, 
        body: preData
      };
      const res = await fetch(url, requestOptions);
      const {data:post_response,status} = await res.json();

      if (status===200) {
        setResponse({ success: true, data:post_response });
        setSuccess(true);
      } else {
        throw new Error(post_response.error || 'Failed to fetch');
      }
    } catch (err:any) {
      setError(err.message || 'Something went wrong');
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success,response, postData};
}
export default usePostAPI