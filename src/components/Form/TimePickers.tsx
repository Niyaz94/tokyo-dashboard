import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // ⏰ Time Icon
import { TextField ,InputAdornment} from "@mui/material";
import dayjs,{ Dayjs } from "dayjs";


interface CustomTimePickerProps {
    label: string;
    value: Dayjs | string | null;
    onChange: (newValue: Dayjs | string | null) => void;
}
const ResponsiveTimePickers: React.FC<CustomTimePickerProps>= ({label,value,onChange}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
            label={label}
            value={(typeof value==='string'?dayjs(value,"HH:mm"):value)}
            onChange={(date)=>{onChange(date.format("HH:mm:ss"))}}
            ampm={false}
            slots={{ textField: TextField }} 
            closeOnSelect={true}
            minutesStep={5}
            slotProps={{
                textField: { 
                    fullWidth: true,
                    InputProps: {
                        endAdornment: (
                          <InputAdornment position="end"> <AccessTimeIcon color="action" /> </InputAdornment>
                        ),
                    }
                },
            }}
        />
    </LocalizationProvider>
  );
}

export default ResponsiveTimePickers;