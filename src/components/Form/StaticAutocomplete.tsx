import React from "react";
import { Autocomplete, TextField, CircularProgress,Box } from "@mui/material";

interface CustomAutocompleteProps {
    label: string;
    options: { value: string; label: string; }[];
    multiple?: boolean;
    onChange: (value: any) => void;
    defaultValue?: any;
    disabled?: boolean;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    label,options,multiple = false,onChange,defaultValue = null,disabled = false,
}) => {


    return (
        <Autocomplete
        multiple={multiple}
        options={options}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(_, value) => onChange(value)}
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
