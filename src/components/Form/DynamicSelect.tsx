import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CircularProgress, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useFetch, {FetchData}  from '../../utility/customHook/useGetAPI';



const DynamicSelect = ({ label, apiUrl, onChange, key_value,isMulti = false,defaultValue }) => {

    console.log(defaultValue);
    const { data,success}: FetchData<[]> = useFetch <[]>(apiUrl,[{label:0,value:new Date().toJSON().slice(0,10)}]);

    return (
        <FormControl fullWidth>
            {/* <InputLabel>{label}</InputLabel> */}
            {!success ? (<CircularProgress size={24} />) : (
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={data}
                    defaultValue={data.filter(({label,value}) => value === defaultValue)[0]}
                    value={defaultValue || {}}
                    onChange={onChange}
                    isMulti={isMulti}
                    styles={{
                        // control: (baseStyles) => ({
                            // ...baseStyles,
                            // backgroundColor: theme.palette.background.default,
                            // color: theme.palette.text.primary,
                            // borderColor: theme.palette.divider,
                            // '&:hover': { borderColor: theme.palette.primary.main }
                        // }),
                        // menu: (baseStyles) => ({
                        //     ...baseStyles,
                        //     backgroundColor: theme.palette.background.paper,
                        //     color: theme.palette.text.primary,
                        // }),
                        // singleValue: (baseStyles) => ({
                        //     ...baseStyles,
                        //     color: theme.palette.text.primary,
                        // }),
                        // multiValue: (baseStyles) => ({
                        //     ...baseStyles,
                        //     backgroundColor: theme.palette.primary.light,
                        //     color: theme.palette.primary.contrastText,
                        // }),
                        // multiValueLabel: (baseStyles) => ({
                        //     ...baseStyles,
                        //     color: theme.palette.primary.contrastText,
                        // }),
                        // multiValueRemove: (baseStyles) => ({
                        //     ...baseStyles,
                        //     color: theme.palette.primary.contrastText,
                        //     ':hover': { backgroundColor: theme.palette.primary.dark, color: 'white' },
                        // }),
                        control: (base) => ({ ...base, minHeight: 48 })

                    }}
                />
            )}
        </FormControl>
    );
};

export default DynamicSelect;