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
    pickerFullWidth?: boolean;
    pickerType?: string;
}
const CustomDatePicker: React.FC<CustomDatePickerInterface>= ({label,value,onChange,placeholder="Please fill this field",pickerFullWidth=true,pickerType="default"}) => {

  const [cleared, setCleared] = React.useState<boolean>(false);

  let pickerTypeOptions=[];
  if (pickerType==="default"){
    pickerTypeOptions=['month','year','day']
  }else if (pickerType==="monthYear"){
    pickerTypeOptions=['month','year']
  }else if (pickerType==="yearOnly"){
    pickerTypeOptions=['year']
  }else if (pickerType==="monthOnly"){
    pickerTypeOptions=['month']
  }else if (pickerType==="dayOnly"){
    pickerTypeOptions=['day']
  }

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
    <LocalizationProvider dateAdapter={AdapterDayjs}  >
      <DemoContainer components={['DatePicker']} sx={{paddingTop: "10px"}}>
        <DatePicker 
          // views={['month' ,'year',  ...(pickerWithoutDay? []:['day' as const]) ]}
          views={pickerTypeOptions as any}
          // format={pickerWithoutDay? "MM/YYYY":"DD/MM/YYYY"}
          label={label} 
          onChange={(date)=>{onChange(currentValueFormat(date))}}
          onError={(error, value) => {
            console.log('DatePicker Error: ', error, value);
          }}
          value={(typeof value==='string'?dayjs(value,"YYYY-MM-DD"):value)}
          // {...(value===null ? { value: dayjs(value,"YYYY-MM-DD") } : null)} 

          slots={{ textField: TextField }} 

          
          slotProps={{
            field: { 
              clearable: true, 
              onClear: () => setCleared(true) 
            },
            textField: { 
              error: false,
              // https://mui.com/x/react-date-pickers/validation/
              // helperText: cleared ? 'Date cleared' : '',
              ...(pickerFullWidth? { fullWidth: true }: { sx: { } })
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
export default CustomDatePicker;