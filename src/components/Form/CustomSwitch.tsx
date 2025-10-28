import React,{FC} from 'react';
import { makeStyles } from "@mui/styles";

import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";

interface CustomSwitchInterface {
    label: string;
    value: boolean | null;
    onChange: (newValue: boolean | null) => void;
    error?: string;
}
const useStyles = makeStyles({
  root: {
    // background:"#000"
  },
});
const CustomizedSwitch:FC<CustomSwitchInterface>= React.memo(({value,label,onChange,error}) => {
    // value=true
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("handleChange",event.target.checked);
        onChange(event.target.checked);
    };
    return (
        // <FormGroup>
        //     <FormControlLabel 
        //         control={
        //             <Switch 
        //                 size="medium" color="success" 
        //                 checked={value} 
        //                 // defaultChecked={value} 
        //                 onChange={handleChange}
        //                 classes={{ root: classes.root }}
        //             />
        //         } 
        //         label={label}  
        //     />
        // </FormGroup>
    <FormControl component="fieldset" error={Boolean(error)}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              size="medium"
              color="success"
              checked={!!value}
              onChange={handleChange}
              classes={{ root: classes.root }}
            />
          }
          label={label}
        />
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
    );
})

export default CustomizedSwitch