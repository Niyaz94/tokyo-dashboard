import React,{useState,useEffect}           from "react";
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

    const [selectValue, setSelectValue] = useState<any>(multiple ? (defaultValue ?? []) : (defaultValue ?? null));

    useEffect(() => {
      setSelectValue(multiple ? (defaultValue ?? []) : (defaultValue ?? null));
    }, [defaultValue, multiple]);

    
    return (
        <Autocomplete
            sx={{paddingTop: "10px"}}
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
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }
                }}
                />
            )}
        />
    );
});

export default CustomAutocomplete;
