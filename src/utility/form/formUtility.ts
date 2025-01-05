// import {StylesConfig}                             from "react-select"
// import {Control,FieldErrors,UseFormRegister}    	from 'react-hook-form';

// import {SELECT_OPTION_TYPE}                       from "../types/typeApp"
// import FormValidation			    				            from './formValidation'


// export const customReactSelectStyles= (background:string,borderColor:string)=>{
//   const react_select:StylesConfig<SELECT_OPTION_TYPE, false>= {
//       control: (baseStyles, state) => {
//         return {
//           ...baseStyles,
//           borderWidth:"0px",
//           boxShadow: state.isFocused ? "#0ff" : "#0f0",
//           padding: '24px 20px',
//           // overflow:"auto",
//           background,
//           borderRadius:"8px",
//           borderColor,
//           "&:hover": {
//             borderColor
//           }
//         }
//       },
//       option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//         return {
//           ...styles,
//           background,
//           "&:hover": {
//             background:"#999"
//           },
//           color: '#FFF',
//         };
//       },
//       valueContainer: (provided, state) => ({
//         ...provided,
//         padding: '0px 0px',
//         textAlign:"left",
//       }),
//       input: (provided, state) => ({
//         ...provided,
        
//         margin: '0px',
//         padding: '0px',
//       }),
//       indicatorSeparator: state => ({
//         display: 'none',
//       }),
//       indicatorsContainer: (provided, state) => ({
//         ...provided,
//       }),
//       dropdownIndicator: base => ({
//         ...base,
//         padding: '0px 0px',
//       }),
//       singleValue: base => ({
//         ...base,
//         color: '#FFF',

//       }),
//       menu: base => ({
//         ...base,
//         background,

//       }),
//       menuList: base => ({
//         ...base,
//         color:"#fff",
//       })
//   };

//   return react_select
// }

// export class GENERATE_ELEMENT {
  
//   control:Control<{}, any, {}>;
//   errors:FieldErrors;
//   register:UseFormRegister<{}>;
//   required:boolean;
//   constructor(control: Control<{}, any, {}>, errors: FieldErrors, register: UseFormRegister<{}>,required:boolean) {
//       this.control  = control;
//       this.errors   = errors;
//       this.register = register;
//       this.required = required;
//   }
//   SELECT (inputName:string,inputLabel:string,pClass:string,placeholder:string,options:{[key:string]:string|number},showLabel?:boolean){
//     return {
//       inputName,
//       inputLabel ,
//       placeholder,
//       register:this.register,
//       options,
//       control:this.control ,
//       errors:this.errors ,
//       required:this.required,
//       parentClassName:pClass,
//       ...(showLabel!==undefined && {showLabel})

//     }
//   }
//   INPUT (inputType:string,pClass:string,valText:string|undefined,inputName:string,inputLabel:string,placeholder:string){
//     return {
//       inputName,
//       inputType,
//       inputLabel ,
//       placeholder,
//       errors:this.errors,
//       register:this.register,
//       parentClassName:pClass, 
//       ...(valText!==undefined && {validation:FormValidation(valText)})
//     }
//   }
//   CHECKOX (pClass:string,inputName:string,inputLabel:string,show_label:boolean,options:{[key :string]:string}){
//     return {
//       inputName,
//       inputLabel ,
//       show_label,
//       parentClassName:pClass, 
//       options,
//       errors:this.errors ,
//       register:this.register,
//       validation:{}
//     }
//   }
//   TEXTAREA (pClass:string,valText:string,inputName:string,inputLabel:string,placeholder:string){
//     return {
//       inputName,
//       inputLabel ,
//       placeholder,
//       errors:this.errors ,
//       register:this.register,
//       parentClassName:pClass, 
//       validation:FormValidation(valText)
//       // ...(valText!==undefined && {validation:FormValidation(valText)})
//     }
//   }
// }

import React from 'react'

export default function () {
  return "Hello World"
}