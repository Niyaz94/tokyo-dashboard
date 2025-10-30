import React,{useState,useEffect}           from "react";
import { 
    Autocomplete, TextField,Box,FormControl,FormHelperText,Tooltip, Button,IconButton
}      from "@mui/material";
import { useNavigate,useLocation } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { dailySingleInterface }             from '../../utility/types/typeStore';


interface CustomAutocompleteProps {
    label: string;
    options: dailySingleInterface[];
    multiple?: boolean;
    onChange: (key:string,value: any) => void;
    showValueInLabel?: boolean;
    defaultValue?: any;
    disabled?: boolean;
    formKey: string;
    error?: string;
    extraButton?:boolean;
    buttonUrl?:string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = React.memo(({
    label,options,formKey,
    multiple = false,
    onChange,defaultValue = null,
    disabled = false,
    showValueInLabel=true,
    extraButton=false, 
    buttonUrl="",
    error
}) => {

    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState<any>(multiple ? (defaultValue ?? []) : (defaultValue ?? null));

    useEffect(() => {
      setSelectValue(multiple ? (defaultValue ?? []) : (defaultValue ?? null));
    }, [defaultValue, multiple]);

    
    return (
        <FormControl component="fieldset" error={Boolean(error)} fullWidth sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 ,justifyContent: "center"}}>
            <Box sx={{ flexGrow: 1,paddingTop: "10px" }}>
                <Autocomplete
                    sx={{}}
                    id={`${formKey}-autocomplete`}
                    multiple={multiple}
                    options={options}
                    // defaultValue={selectValue }
                    value={selectValue }
                    disabled={disabled}
                    // disableClearable
                    onChange={(e, newValue,reason, details) => {
                        if (multiple) {
                            const isAllLastItemSelected: boolean = newValue.length > 0 && newValue[newValue.length-1].value === 'all';
                            if (isAllLastItemSelected) {
                                newValue = newValue.filter((item) => item.value !== 'all');
                            }
                            const uniqueValues = [
                                ...(isAllLastItemSelected ? ['all'] :  new Set(newValue.map(row => row.value)))
                            ];
                            onChange(formKey,uniqueValues || []);
                            setSelectValue(newValue || []);
                        } else {
                            const value = newValue?.value ?? null;
                            const label = newValue?.label ?? '';
                            onChange(formKey,value ? value : null);
                            setSelectValue(value ? { value, label } : null);
                        }
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                                {option.label} {showValueInLabel && `(${option.value})`} 
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label={label} variant="outlined" fullWidth
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }
                        }}
                        />
                    )}    
                />
            </Box>
            
            {extraButton && <Tooltip title="Add New Topic Title" sx={{fontSize: '0.8rem',}} placement="top">
                <IconButton color="primary" edge="end" sx={{padding:"0px",paddingTop: "10px",marginRight:"5px" }} >
                    <AddCircleIcon fontSize="large" sx={{fontSize:"42px"}} onClick={() => navigate(buttonUrl,{state: { from: location.pathname } })} />
                </IconButton>
              </Tooltip>}
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        
    );
});

export default CustomAutocomplete;
