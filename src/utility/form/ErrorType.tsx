// import {ERROR_TYPE}      from "../types/typeApp"

// const getErrorMessage = (fieldName: string, errs: Record<string, any>): string | undefined =>
//     typeof errs?.[fieldName]?.message === 'string' ? errs?.[fieldName]?.message : undefined;

// export default ({ inputName,errors}:ERROR_TYPE) =>{
//     return (<>{
//         errors[inputName] && <p className="text-red-500 text-xs italic text-left">{getErrorMessage(inputName, errors)}</p>
//     }</>)
// } 
import React from 'react'

export default function ErrorType() {
  return (
    <div>ErrorType</div>
  )
}
