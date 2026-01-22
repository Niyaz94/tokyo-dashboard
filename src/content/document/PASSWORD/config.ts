
import { StatusCase2 as SECRECYLEVEL } from '../../../utility/function/data';

export const inputFields = (dynamicData:any)=>[
    { fieldType:"form",size:4,  type: "text", key: "title", label: "Password Name" },
    { fieldType:"form",size:4,  type: "text", key: "username", label: "Username" },
    { fieldType:"form",size:4,  type: "email", key: "email", label: "Email" },
    { fieldType:"form",size:6,  type: "password", key: "password", label: "New Password" },
    { fieldType:"form",size:6,  type: "password", key: "rpassword", label: "Repeat Password" },
    { fieldType:"form",size:6,  type: "url", key: "url", label: "Url" },
    { fieldType:"form",size:6,  type: "autocomplete",key: "secrecy_level",  label: "Select Secrecy Level",    options: SECRECYLEVEL},
    { fieldType:"form",size:12, type: "m_autocomplete",  key: "type_ids", label: "Select Password Type",   options: dynamicData.memPasswordTypes,buttonUrl:'/documents/password_type/add'},
    { fieldType:"form",size:12, type: "editor", key: "notes", label: "Password Details" },

];
