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
  const [error, setError] = useState<{message:string,errors:Record<string,any>}>({message:"",errors:{}});


  const postData = async (url:string,body:any,bodyType:string="JSON",successState=201) => {
    setLoading(true);
    setSuccess(false);
    setError({message:"",errors:{}});


    try {
      let preData;

      if (bodyType==="JSON"){
        preData = JSON.stringify(body)
      }
      if(bodyType==="FORM"){
        preData = new FormData();
        for (const key in body){
          if(key.startsWith("img") || key.startsWith("image")){
            if(Array.isArray(body[key])){
              body[key].forEach((img) => preData.append(key.split("_")[1], img));
            }else
              preData.append(key, body[key]);
          }else if(key.startsWith("date")){
            // if date and time is needed
            //preData.append(key, new Date(formData[key as keyof FORM_TYPE]).toLocaleString("en-CA",{hour12: false}).replace(",",""));
            preData.append(key, new Date(body[key]).toLocaleDateString("en-CA"));
          }else{
            preData.append(key, body[key].value ? body[key].value: body[key]);
          }
        }
      }

      let headers = {

      };
      if (bodyType==="JSON")  
        headers= {
            'Content-Type': 'application/json'
        }
        
      const requestOptions = {
        method: "POST",
        headers,
        body: preData
      };
      const res = await fetch(`http://127.0.0.1:8000/${url}`, requestOptions);
      const post_response = await res.json();

      //res.statusText
      if (res.status===successState) {
        setResponse({ success: true, data:post_response });
        setSuccess(true);
      } else {
        // throw new Error(post_response.message || 'Failed to fetch');
        throw new Error(
          post_response.message || 'Failed to fetch',
          {cause: { errors: post_response.errors || {} }}
        );
      }
    } catch (err:any) {
      // setError(err.message || 'Something went wrong');
      setError({message: err.message || "Something went wrong", errors: err.cause.errors || {}});
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }

    // if you add return then you can receive the data in this way => const responseData = await postData('notes/sleep/', formData);
    // return response;
  };

  return { loading, error, success,response, postData};
}
export default usePostAPI