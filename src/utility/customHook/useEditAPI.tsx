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
  

  const editData = async (url: string, body: any, method: "PUT" | "PATCH" = "PUT",successState=200) => {
    setLoading(true);
    setResponse(null);
    setError({message:"",errors:{}});

    try {
      const res = await fetch(`http://127.0.0.1:8000/${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.status===successState) {
        // console.error("5:", data.data);

       setResponse({ success: true, data:data });
       setSuccess(true);
      } else {
        // console.error("3:", data.errors);

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
