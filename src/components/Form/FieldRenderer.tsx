// components/FieldRenderer.tsx
import { TextField, Grid,FormControl } from "@mui/material";
import { CustomSwitch,DynamicAutocomplete,TimePickers, StaticAutocomplete,ThreeStateButton,CustomDatePicker ,FilterField} from "./index";
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
        type={field.type}
        label={field.label}
        value={value}
        onChange={e => handleFormChange(field.key, e.target.value)}
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
    component= (field.options &&
      <StaticAutocomplete
        label={field.label}
        showValueInLabel={field.fieldType==="filter"? false : true}
        multiple={true}
        options={field.fieldType==="filter"?[{value:"all",label:"ALL"},...field.options]:field.options}
        formKey={field.key}
        defaultValue={
          (Array.isArray(value) && value.length > 0) &&
          field.options.filter(({value:item_value})=>value.includes(item_value)) || [{value: "all", label: "ALL"}]
          // value.map((item: string) => ({
          //   value: item,
          //   label:field.options.find(({value,label}) => value === item).label?.toString().replace(/_/gi, " ").toUpperCase() || "ALL"
          // })) || [{value: "all", label: "ALL"}]
        }
        onChange={handleFormChange}
        error={(error?.[0] || "").replace(/['"]+/g, '')}
      />
    );
  }else if (field.type=="d_autocomplete"){
    component= ((value || !isEdit) && <DynamicAutocomplete
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
