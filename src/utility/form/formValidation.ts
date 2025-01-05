const registerOptions = {
    textFiled: { 
      required: "The field is required",
      maxLength: { 
        value: 20, 
        message: "The maximum length is 20" 
      },
      minLength: {
        value: 3, 
        message: "The minimum length is 3" 
      }
    },
    select: { 
      required: "The field is required"
    },
    numberFiled: { 
      required: "The field is required",
      max: { 
        value: 10, 
        message: "The maximum length is 20" 
      },
      min: {
        value: 1, 
        message: "The minimum length is 3" 
      },
      //valueAsNumber: true, ===>>> if string provide it convert to number
      //setValueAs: v => parseInt(v),
      //disabled: true
    },
    dateFiled: { 
      required: "The field is required",
      valueAsDate: true,
      validate: {
        maxDate:(value:Date) => value.toLocaleDateString("en-CA") <= '2024-12-31' || "The maximum date is 2024-12-31",
        minDate: (value:Date) => value.toLocaleDateString("en-CA") >= '2024-01-01' || "The minimum date is 2024-01-01"
      }
    },
    textArea:{ 
      required: "Please add your thought",
      maxLength: 1000 
    },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    },
    checkBox:{
      required: "The field is required",
    },
    file:{
      required: "Image of the Desire Building is Required",
      validate: {
        fileType:(file:any) =>  ["png","jpeg","jpg","gif"].includes(file[0].type.split("/")[1].toLowerCase()) || "The file type should be JPEG, JPG, PNG, and GIF",
        fileSize:(file:any) =>  file[0].size/(1024*1024)<5 || "The file size should be less than 5MB"
      }
    }
};
export default (PARAM:string) => {
  return registerOptions[PARAM as keyof typeof registerOptions]
};