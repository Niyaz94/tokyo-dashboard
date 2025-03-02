import React, { useState, useEffect } from 'react';
import {Card,CardHeader,CardContent,Divider,Collapse,Box,TextField,Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { useCollapseContext } from '../../../contexts/CollapseToggle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomSelect from '../../../components/Form/CustomSelect';
import LexicalEditor from '../../../components/Custom/Lexical/Editor';
import {useSelectOptions}   from '../../../utility/customHook/useSelectOptions';
import DynamicSelect from '../../../components/Form/DynamicSelect';
import TimePickers from '../../../components/Form/TimePickers';
import DynamicAutocomplete from '../../../components/Form/DynamicAutocomplete';
import StaticAutocomplete from '../../../components/Form/StaticAutocomplete';
import dayjs,{ Dayjs } from "dayjs";

const CollapsibleForm: React.FC = () => {


  const { options: currencies, loading: currenciesLoading } = useSelectOptions('notes/currency/currency_select');

  const { open } = useCollapseContext();

  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    note: '', // Quill editor content
    currency: '',
    type: '',
  });

  const [sleepStatus, setsleepStatus] = useState([
    {value:"vlow",label: 'Very Low'},
    {value:"low",label: 'Low'},
    {value:"normal",label: 'Normal'}, 
    {value:"high",label: 'High'},
    {value:"vhigh",label: 'Very High'},
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   // setAge(event.target.value as string);
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleNoteChange = (value: string) => {
    setFormData((prev) => ({ ...prev, note: value }));
  };
  const handleSelectChange = (selectedOption) => {
    console.log('Selected:', selectedOption);
};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState("**Bold *Italic***");

  const handleSave = async () => {
    // console.log('Form Data:', formData);
    // alert('Form saved!');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/notes/expense/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
      console.error('Error submitting the form:', err);
    } finally {
      setLoading(false);
    }
  };

  const [times, setTimes] = useState<{ [key: string]: Dayjs | null }>({
    time1: dayjs(),
    time2: null,
    time3: dayjs("09:00", "HH:mm"),
  });
  
  const handleTimeChange = (key: string, newValue: Dayjs | null) => {
    console.log(newValue)
    setTimes((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <Collapse in={open}>
      <Card>
        <CardHeader title="Input Fields" />
        <Divider />
        <CardContent>  
          <Box
            component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}

          >
            <Grid container spacing={2}>
              <Grid size={4} >
                <TimePickers label="Bed Time" value={times.time1} onChange={(newValue) => handleTimeChange("time1", newValue)} />
              </Grid>
              <Grid size={4} >
                <TimePickers label="Fell Sleep Time" value={times.time2} onChange={(newValue) => handleTimeChange("time3", newValue)} />
              </Grid>
              <Grid size={4} >
                <TimePickers label="Waking Up Time" value={times.time3} onChange={(newValue) => handleTimeChange("time3", newValue)} />
              </Grid>
              <Grid size={4} >
                <DynamicAutocomplete label="Select The Day" endpoint="notes/daily/select_date" onChange={handleSelectChange} />
              </Grid>
              <Grid size={4}>
               <StaticAutocomplete label="Morning Feeling" options={sleepStatus} onChange={handleSelectChange}
                // onChange={({label,value}) =>setFormData((prev) => ({ ...prev, [label]: value }))} 
              />

                
              </Grid>
              <Grid size={4}>
               <StaticAutocomplete label="Sleep State" options={sleepStatus} onChange={handleSelectChange}
                // onChange={(e) =>setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} 
              />

               
              </Grid>
              <Grid size={12} >
                <LexicalEditor onChange={handleNoteChange} value={markdown} />
              </Grid>
              {/* <Grid size={12} > */}
                {/* <LexicalEditor value={markdown} isDisabled key={markdown} onChange={() => {}} /> */}
              {/* </Grid> */}
              <Grid size={12} >
                <Button
                  variant="contained" color="success" onClick={handleSave} fullWidth
                  sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none',}}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default CollapsibleForm;