import React,{useCallback,useState, useEffect}  from "react";
import { Autocomplete, TextField,Box }          from "@mui/material";
import { dailySingleInterface }                 from '../../utility/types/typeStore';

// when select the option, it make an extra call to the server, this should be fixed
interface CustomAutocompleteProps {
    label: string;
    multiple?: boolean;
    onChange: (key:string,value: any) => void;
    showValueInLabel?: boolean;
    defaultValue?: any;
    disabled?: boolean;
    formKey: string;
    fetchOptions: (inputValue: string) => Promise<dailySingleInterface[]>;
    debounceMs?: number;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = React.memo(({
    label,formKey,fetchOptions,multiple = false,onChange,defaultValue = null,disabled = false,showValueInLabel=true,debounceMs = 500
}) => {
    const [inputValue, setInputValue] = useState('');
    

    // const [selectValue, setSelectValue] = useState(defaultValue || {value: null,label: ''} as dailySingleInterface);
    const [selectValue, setSelectValue] = useState<any>(multiple ? (defaultValue || []) : (defaultValue || null));

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        // onChange(formKey,selectValue.value);
        if (multiple) {
          onChange(formKey, selectValue.map((v: dailySingleInterface) => v.value));
        } else {
          onChange(formKey, selectValue?.value ?? null);
        }
    }, [selectValue]);

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(inputValue);
        }, debounceMs);
    
        return () => {
          clearTimeout(handler);
        };
    }, [inputValue, debounceMs]);

    useEffect(() => {
        let active = true;
    
        const loadOptions = async () => {
          if (debouncedValue.length < 2) {
            setOptions([]);
            return;
          }
          setLoading(true);
          const result = await fetchOptions(debouncedValue);
          if (active) {
            setOptions(result);
            setLoading(false);
          }
        };
    
        loadOptions();
        return () => {
          active = false;
        };
    }, [debouncedValue]);
    //[debouncedValue, fetchOptions] -> I don't know if this is correct or not, but it works fine

    

    return (
        <Autocomplete
            sx={{paddingTop: "10px"}}
            id={`${formKey}-autocomplete`}
            multiple={multiple}
            options={options}
            loading={loading}
            onInputChange={(event, value,reason) => {
                // console.log("onInputChange",reason)
                if (reason == 'input') {
                    // console.log("Hiiiiiiii")
                    setInputValue(value);
                }
            }}
            // defaultValue={defaultValue}

            // I added this part [|| defaultValue] on 2026-01-13, I did not tested fully so it maybe wrong
            value={selectValue || defaultValue}
            // value={selectValue.label ? selectValue: null}
            disabled={disabled}
            // disableClearable
            onChange={(e, newValue,reason, details) => {
                if (multiple) {
                    setSelectValue(newValue || []);
                } else {
                    const value = newValue?.value ?? null;
                    const label = newValue?.label ?? '';
                    setSelectValue(value ? { value, label } : null);
                }
                // const value = newValue?.value ?? null;  
                // const label = newValue?.label ?? '';
                // // console.log(value,label)
                // setSelectValue({value,label});
            }}
            autoHighlight
            getOptionLabel={(option) => {
                // console.log("getOptionLabel",option)
                return option.label
            }}
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
