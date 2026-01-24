import axios from 'axios';





const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
    // 
  },
});


export default API;


export const axiosGetData = async (URL:string,token:string="") => {
  


  try{
    const res = await API.get(URL,{
        headers: {
          ...(token && {Authorization: `Token ${token}`})
        }
    });
    return res;
  }catch(e){
    console.log("Error:",e);
    return {data:{}};
  }
};