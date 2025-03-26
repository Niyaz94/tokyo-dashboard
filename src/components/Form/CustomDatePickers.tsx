import React from 'react';
import { DemoContainer }            from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs }             from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }     from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker }               from '@mui/x-date-pickers/DatePicker';
import { TextField }                from "@mui/material";
import dayjs,{ Dayjs }              from "dayjs";


interface CustomDatePickerInterface {
    label: string;
    placeholder?:string;
    value: Dayjs | string | null;
    onChange: (newValue: Dayjs | string | null) => void;
}
const CustomDatePicker: React.FC<CustomDatePickerInterface>= ({label,value,onChange,placeholder="Please fill this field"}) => {

  const [cleared, setCleared] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const currentValueFormat=(value)=>{
      if (typeof value === 'string'){
        return dayjs(value,"YYYY-MM-DD")
      }else if (value == null){
        return value
      }else{
        return value.format("YYYY-MM-DD")
      }
  }

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
          label={label} 
          onChange={(date)=>{onChange(currentValueFormat(date))}}
          value={(typeof value==='string'?dayjs(value,"YYYY-MM-DD"):value)}
          slots={{ textField: TextField }} 
          slotProps={{
            field: { 
              clearable: true, 
              onClear: () => setCleared(true) 
            },
            textField: { 
              fullWidth: true,
              helperText: placeholder 
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
export default CustomDatePicker;