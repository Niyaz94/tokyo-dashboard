import React,{useEffect,useState} from "react";
import { Autocomplete, TextField,Box } from "@mui/material";
import { dailySingleInterface }      from '../../utility/types/typeStore';


interface CustomAutocompleteProps {
    label: string;
    options: dailySingleInterface[];
    multiple?: boolean;
    onChange: (key:string,value: any) => void;
    defaultValue?: any;
    disabled?: boolean;
    formKey: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    label,options,formKey,multiple = false,onChange,defaultValue = null,disabled = false,
}) => {
    return (
        <Autocomplete
        multiple={multiple}
        options={options}
        defaultValue={options.filter((item) => item.value === defaultValue)[0]}
        value={defaultValue || null}
        disabled={disabled}
        disableClearable
        onChange={(e, {value,label},reason, details) => {
            // console.log(value,label,reason, details)
            onChange(formKey,value);
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
                <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                    {option.label} ({option.value}) 
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
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }
              }}
            />
        )}
        />
    );
};

export default CustomAutocomplete;
