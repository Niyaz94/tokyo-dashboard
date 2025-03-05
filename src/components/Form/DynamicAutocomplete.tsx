import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress,Box } from "@mui/material";
import useFetch, {FetchData}  from '../../utility/customHook/useGetAPI';

interface CustomAutocompleteProps {
    label: string;
    endpoint: string;
    multiple?: boolean;
    onChange: (key:string,value: any) => void;
    defaultValue?: any;
    disabled?: boolean;
    formKey: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    label,endpoint,formKey,multiple = false,onChange,defaultValue = null,disabled = false,
}) => {

    const { data: options, success }: FetchData<[]> = useFetch <[]>(endpoint,[]);


    return (
        <Autocomplete
        multiple={multiple}
        options={options}
        defaultValue={defaultValue}
        loading={success?false:true}
        disabled={disabled}
        onChange={(_, {label,value}) => onChange(formKey,value)}
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
