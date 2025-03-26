import React,{FC} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { makeStyles } from "@mui/styles";


interface CustomSwitchInterface {
    label: string;
    value: boolean | null;
    onChange: (newValue: boolean | null) => void;
}
const useStyles = makeStyles({
  root: {
    // background:"#000"
  },
});
const CustomizedSwitch:FC<CustomSwitchInterface>= ({value,label,onChange}) => {

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };
    return (
        <FormGroup>
            <FormControlLabel 
                control={
                    <Switch 
                        size="medium" 
                        color="success" 
                        defaultChecked={value} 
                        onChange={handleChange}
                        classes={{ root: classes.root }}
                    />
                } 
                label={label}  
            />
        </FormGroup>
    );
}

export default CustomizedSwitch