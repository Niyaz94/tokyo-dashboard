import { useState, useEffect } from 'react';


export interface FetchData<S> {
    data: S;
    loading: boolean;
    success: boolean;
    error: string|null;
}
const useGetAPI = <T,>(url: string,default_value:any): FetchData<T> => {

  const [data,        setData] = useState<T>(default_value);
  const [error,      setError] = useState<string|any>(null);
  const [loading,  setLoading] = useState<boolean>(true);
  const [success,  setSuccess] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null); 

    try {     
      const get_response = await fetch(`http://127.0.0.1:8000/${url}`);
      const result = await get_response.json();
      setData(result);
      setSuccess(true);
    } catch (error:any) {
      setSuccess(false);
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) {
      setSuccess(false);
      return; 
    }
    
    fetchData();
    return () => {};
  }, [url]);
  return { data, error,loading, success};
}

export default useGetAPI;