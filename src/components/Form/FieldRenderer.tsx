// components/FieldRenderer.tsx
import { TextField, Grid } from "@mui/material";
import { CustomSwitch,DynamicAutocomplete,TimePickers, StaticAutocomplete,ThreeStateButton,CustomDatePicker } from "./index";
import LexicalEditor from "../Custom/Lexical/Editor";
import dayjs                  from 'dayjs';


export const FieldRenderer = ({ field, formData, handleFormChange,isEdit }: any) => {
  const value = formData[field.key];
  switch (field.type) {
    case "number":
        return (<Grid size={4}>
            <TextField
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
            />
        </Grid>);
    case "text":
      return (
        <Grid size={field.size}>
          <TextField
            fullWidth
            type={field.type}
            label={field.label}
            value={value}
            onChange={e => handleFormChange(field.key, e.target.value)}
          />
        </Grid>
      );
    case "switch":
      return (
        <Grid size={field.size}>
          <CustomSwitch value={value} label={field.label} onChange={v => handleFormChange(field.key, v)} />
        </Grid>
      );
    case "threeStateSwitch":
      return (
        <Grid size={field.size}>
            <ThreeStateButton 
                label={field.label} 
                onChange={v => handleFormChange(field.key, v)}
                buttonValue={{"on":"success","off":"failure","auto":"neutral"}}
                defaultValue={value}

            />
        </Grid>
      );
    case "autocomplete":
      return (
        <Grid size={field.size}>
          <StaticAutocomplete
            label={field.label}
            options={field.options}
            formKey={field.key}
            defaultValue={field.options.find((o: any) => o.value === value)}
            onChange={handleFormChange}
          />
        </Grid>
      );
    case "d_autocomplete":
      return (
        <Grid size={field.size}>
          {(value || !isEdit) && <DynamicAutocomplete
            label={field.label}
            defaultValue={value}
            fetchOptions={field.optionfun}
            formKey={field.key}
            onChange={handleFormChange}
          />}
        </Grid>
      );
    case "date":
        return (
            <Grid size={field.size}>
                <CustomDatePicker
                   label={field.label}
                   value={value}
                   placeholder={field.label}
                   onChange={(newValue) => handleFormChange(field.key, newValue )}
                 />
            </Grid>
        );
    case "time":
        return (
            <Grid size={field.size}>
                <TimePickers
                  label={field.label}
                  value={value?dayjs(value, 'HH:mm:ss'):value}
                  onChange={(newValue) =>handleFormChange(field.key, newValue)}
                />
            </Grid>
        );
    case "editor":
      return (
        <Grid size={field.size}>
          <LexicalEditor value={value} onChange={handleFormChange} formKey={field.key} label={field.label} />
        </Grid>
      );
    default:
      return null;
  }
};
