import { useState } from 'react';
import {TextField,IconButton,InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default ({key,value,label,onChange,required}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      name={key}
      value={value}
      autoComplete="current-password"
      fullWidth
      required={required}
      onChange={onChange}
      slotProps={{
        input: { 
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            )},
        }}
     
    />
  );
}
