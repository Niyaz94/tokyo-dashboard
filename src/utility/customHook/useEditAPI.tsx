import { useState } from "react";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const useEditAPI = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{message:string,errors:Record<string,any>}>({message:"",errors:{}});
  const [success,  setSuccess]  = useState<boolean>(false);
  

  const editData = async (url: string, body: any,bodyType:string="JSON", method: "PUT" | "PATCH" = "PUT",successState=200) => {
    setLoading(true);
    setResponse(null);
    setError({message:"",errors:{}});

    try {
      let preData;

      if (bodyType==="JSON"){
        preData = JSON.stringify(body)
      }
      if(bodyType==="FORM"){
        preData = new FormData();
        for (const key in body){
          if(key.startsWith("img") || key.startsWith("image") || key.startsWith("url")){
            // console.log("body[key]",body[key]);
            if(Array.isArray(body[key])){
              body[key].forEach((row) => preData.append(key, row));
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

      let headers = {};
      if (bodyType==="JSON")  
        headers= {
            'Content-Type': 'application/json'
        }
      const requestOptions = {
        method: method,
        headers,
        body: preData
      };

      // const res = await fetch(`http://127.0.0.1:8000/${url}`, {
      //   method: method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(body),
      // });
      const res = await fetch(`http://127.0.0.1:8000/${url}`, requestOptions);

      const data = await res.json();




      if (res.status===successState) {

       setResponse({ success: true, data:data });
       setSuccess(true);
      } else {

        throw new Error(
          data.message || 'Failed to fetch',
          {cause: { errors: data.errors || {} }}
        );
      }

    } catch (err: any) {
      // console.error("4:", err.cause.errors);

      setError({message: err.message || "Something went wrong", errors: err.cause.errors || {}});
      setResponse({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return { success,response, loading, error, editData };
};

export default useEditAPI;
