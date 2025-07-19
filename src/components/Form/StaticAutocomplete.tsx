import React,{useCallback}                  from "react";
import { Autocomplete, TextField,Box }      from "@mui/material";
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
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = React.memo(({
    label,options,formKey,multiple = false,onChange,defaultValue = null,disabled = false,showValueInLabel=true
}) => {
    // console.log("CustomAutocomplete",formKey); //Do not remove this line, it relates to the rerendering issue.
    return (
        <Autocomplete
            sx={{paddingTop: "10px"}}
            id={`${formKey}-autocomplete`}
            multiple={multiple}
            options={options}
            defaultValue={options.filter((item) => item.value === defaultValue)[0] || null}
            value={defaultValue || null}
            disabled={disabled}
            // disableClearable
            onChange={(e, newValue,reason, details) => {

                const value = newValue?.value ?? null;  
                // const label = newValue?.label ?? formKey;
                onChange(formKey,value);
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
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }
                }}
                />
            )}
        />
    );
});

export default CustomAutocomplete;
