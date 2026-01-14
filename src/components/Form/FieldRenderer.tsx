// components/FieldRenderer.tsx
import { TextField, Grid,FormControl } from "@mui/material";
import { 
  TextSearch,CustomSwitch,DynamicAutocomplete,TimePickers, StaticAutocomplete,
  ThreeStateButton,CustomDatePicker ,FilterField,FileUpload
} from "./index";
import LexicalEditor from "../Custom/Lexical/Editor";
import dayjs                  from 'dayjs';



export const FieldRenderer = ({ field, formData, handleFormChange,isEdit,error }: any) => {
  const value = formData[field.key];

  let component= null
  if (field.type=="number"){
    component= (<TextField
      label={field.label}
      variant="outlined"
      required={field.required || true}
      fullWidth
      type="number"
      value={value}
      onChange={(e) =>
        handleFormChange(field.key, e.target.value)
      }
      margin="dense"
      slotProps={{
        inputLabel: { shrink: true },
        htmlInput: { max: field.max, min: field.min, step: 1 }
      }}
    />);
  }else if (field.type=="text"){
    component= (
      <TextField
        fullWidth
        variant="outlined"
        required={field.required || true}
        type={field.type}
        label={field.label}
        placeholder={field.label}
        value={value}
        onChange={e => handleFormChange(field.key, e.target.value)}
        margin="dense"
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
    );
  }else if (field.type=="switch"){
    component= (
      <CustomSwitch value={value} label={field.label} onChange={v => handleFormChange(field.key, v)}  />
    );
  }else if (field.type=="threeStateSwitch"){
    component= (
       <ThreeStateButton 
          label={field.label} 
          onChange={v => handleFormChange(field.key, v)}
          buttonValue={{"on":"success","off":"failure","auto":"neutral"}}
          defaultValue={value}
        />
    );
  }else if (field.type=="autocomplete"){
    component= (field.options &&
      <StaticAutocomplete
        label={field.label}
        showValueInLabel={field.fieldType==="filter"? false : true}
        options={field.fieldType==="filter"?[{value:"all",label:"ALL"},...field.options]:field.options}
        formKey={field.key}
        defaultValue={field.options.find((o: any) =>  o.value === value) || (field.fieldType==="form"?null:{value:"all",label:"ALL"})}
        onChange={handleFormChange}
        error={(error?.[0] || "").replace(/['"]+/g, '')}
      />
    );
  }else if (field.type=="m_autocomplete"){
    const showValueInlabel=field?.showValueInlabel || false
    const buttonUrl = field.buttonUrl || ""
    component= (field.options &&
      <StaticAutocomplete
        label={field.label}
        showValueInLabel={showValueInlabel? true:false}
        multiple={true}
        options={field.fieldType==="filter"?[{value:"all",label:"ALL"},...field.options]:field.options}
        formKey={field.key}
        defaultValue={
          (Array.isArray(value) && value.length > 0) &&
          field.options.filter(({value:item_value})=>value.includes(item_value)) || (field.fieldType==="filter"?[{value:"all", label:"ALL"}]:[])
        }
        onChange={handleFormChange}
        error={(error?.[0] || "").replace(/['"]+/g, '')}
        {...(buttonUrl.length>0 && {extraButton:true,buttonUrl})}
        // extraButton={true}
        // buttonUrl={'/documents/document_type/add'}
      />
    );
  }else if (field.type=="d_autocomplete"){
    // (value || !isEdit) && -> I remove that (2026-01-13), in edit mode for sleep page when I click the remvove button to remove the default value the complete component will disapear
    component= ( <DynamicAutocomplete
      label={field.label}
      defaultValue={value}
      fetchOptions={field.optionfun}
      formKey={field.key}
      onChange={handleFormChange}
    />);
  }else if (field.type=="date"){
    component= (
      <CustomDatePicker
         label={field.label}
         value={value}
         pickerFullWidth={field.fieldType=="filter"? false : true}
         placeholder={field.label}
         onChange={(newValue) => handleFormChange(field.key, newValue )}
      />
    );
  }else if (field.type=="time"){
    component= (
      <TimePickers
        label={field.label}
        value={value?dayjs(value, 'HH:mm:ss'):value}
        onChange={(newValue) =>handleFormChange(field.key, newValue)}
      />
    );
        
  }else if (field.type=="editor"){
    component= (<LexicalEditor value={value} onChange={handleFormChange} formKey={field.key} label={field.label} />);
  }else if (field.type=="filterField"){
    component= (
      <FilterField
        label={field.label}
        defaultValue={value?.value}
        defaultOperation={value?.operator}
        onChange={(val) => handleFormChange(field.key, val)}
      />
    );
  }else if (field.type=="textSearch"){
    component= (
      <TextSearch
        label={field.label}
        defaultOperation={value?.operator}
        defaultValue={value?.value}
        onChange={(val) => handleFormChange(field.key, val)}
      />
    );
  }else if (field.type=="fileUploader"){
    component= (
      <FileUpload
        label={field.label}
        multiple={field.allowMulti}
        name={field.key}
        initialImages={formData[field.key2]}
        onChange={(files,filesUrl) => handleFormChange([field.key,field.key2], [files,filesUrl] )}
      />
    );
  }

  if (field.fieldType==="form"){
    return (
      <Grid  size={field.size}>
        {component}
      </Grid>
    );
  }else if (field.fieldType==="filter"){
    // console.log("Rendering filter field:", field.key, component);
    return (
      <FormControl variant="outlined" sx={{ minWidth: field.minWidth || 200}}>
        {component}
      </FormControl>
    );
  }
  return component;
};
