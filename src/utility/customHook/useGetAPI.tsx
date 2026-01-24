import { useState, useEffect } from 'react';


import { useSelector}          from 'react-redux'
import { RootState }                from '../../store/Reducer';

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

  const loginDetail = useSelector((state: RootState) =>state.auth);
  

  const fetchData = async () => {
    setLoading(true);
    setError(null); 

    let requestHeader={}
    if(loginDetail.token){
      requestHeader={
          Authorization: `Token ${loginDetail.token}`,
      }
    }

    try {     
      //  
      const get_response = await fetch(`http://127.0.0.1:8000/${url}`,{
        headers: requestHeader
      });
      const result = await get_response.json();
      setData(result);
      setSuccess(true);
    } catch (error:any) {
      setSuccess(false);
      // setData([] as T);
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect (inside useGetAPI) run for url")

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