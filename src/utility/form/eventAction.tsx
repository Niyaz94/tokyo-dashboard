
// import {FORM_TYPE,onChangeActionType,onErrorActionType}      from "../types/typeApp"

// export const onChangeAction:onChangeActionType =(e,type)=>{
//     if(type==="textarea"){
//         console.log("Text Area have been changed")
//     }else if (type==="checkbox"){
//         console.log("Check Box have been changed")
//     }else if (type==="select"){
//         console.log("Select have been changed")
//     }
// }
// export const onErrorAction:onErrorActionType =(error,type)=>{
//     console.log(error,type)
//     if(type==="connect"){
//         console.log("Errors from Connect form",error)
//     }else if(type==="request"){
//         console.log("Errors from Connect form",error)
//     }
// }
// export const onSubmit = async (URL:string,form_data:FORM_TYPE,postData:(url: string, body: any) => Promise<void>) => {
    
//     // const post_data=await postAPIData('realestate/contact/store',formPrepare(data)) //data or getValues()
//     // const { data:postData,success:postSuccess}: Record<string, any>  = usePostFetch ('realestate/contact/store',form_data);
//     // console.log(postData,postSuccess)
//     // reset()
//     try {
//        //you can catch the response in useEffect
//        await postData(`realestate/${URL}`,form_data);
//     } catch (err) {
//        // Handle error
//     }
// };
import React from 'react'

export default function eventAction() {
  return (
    <div>eventAction</div>
  )
}
