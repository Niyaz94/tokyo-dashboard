import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface Option {
  id: string | number;
  name: string;
}

interface CustomSelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: SelectChangeEvent<string | number>) => void;
  options: Option[];
  fullWidth?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({label,name,value,onChange,options,fullWidth = true,}) => {
  return (
    <FormControl fullWidth={fullWidth} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;