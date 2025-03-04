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
import { min } from 'date-fns';

const CollapsibleForm: React.FC = () => {

  const { open } = useCollapseContext();

  // const [times, setTimes] = useState<{ [key: string]: Dayjs | null }>({
    // time1: dayjs(),
    // time2: null,
    // time3: dayjs("09:00", "HH:mm"),
  // });
  const [formData, setFormData] = useState({
    bedTime: dayjs(),
    approxFellSleepTime: null,
    morningWakingUp: dayjs("09:00", "HH:mm"),
    SleepState: '',
    morningFeeling: '',
    daily:'',
    note: '{}',
    dayTimeSleepInMinutes: 0,
    peeCountDuringNight: 0,
    approxWakingNum: 0,
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
  const handleFormChange = (key,value,dataType="normal") => {

    let currentValue=value

    // if(dataType === 'time'){ 
    //   currentValue=dayjs(value);
    // }
    setFormData((prev) => ({ 
      ...prev, [key]: currentValue 
    }));

  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState("**Bold *Italic***");

  const handleSave = async () => {
    console.log('Form Data:', formData);
    // alert('Form saved!');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/notes/sleep/', {
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
                <TimePickers label="Bed Time" value={formData.bedTime} onChange={(newValue) => handleFormChange("bedTime", newValue)} />
              </Grid>
              <Grid size={4} >
                <TimePickers label="Fell Sleep Time" value={formData.approxFellSleepTime} onChange={(newValue) => handleFormChange("approxFellSleepTime", newValue)} />
              </Grid>
              <Grid size={4} >
                <TimePickers label="Waking Up Time" value={formData.morningWakingUp} onChange={(newValue) => handleFormChange("morningWakingUp", newValue)} />
              </Grid>

              <Grid size={4} >
                <DynamicAutocomplete label="Select The Day" endpoint="notes/daily/select_date" formKey="daily" onChange={handleFormChange} />
              </Grid>
              <Grid size={4}>
               <StaticAutocomplete label="Morning Feeling" options={sleepStatus}  formKey="morningFeeling" onChange={handleFormChange}/>
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete label="Sleep State" options={sleepStatus} formKey="SleepState" onChange={handleFormChange}/>    
              </Grid>
              <Grid size={4} >
                <TextField 
                  label={"Day Time Sleep"} variant="outlined" fullWidth type="number" value={formData.dayTimeSleepInMinutes} 
                  onChange={(e)=>handleFormChange("dayTimeSleepInMinutes",e.target.value)} 
                  slotProps={{ inputLabel:{shrink: true},htmlInput: { max: 600, min: 0 ,step: 1}}} 

                />
              </Grid>
              <Grid size={4}>
                <TextField 
                  label={"Pee Count During Night"} variant="outlined" fullWidth type="number" value={formData.peeCountDuringNight} 
                  onChange={(e)=>handleFormChange("peeCountDuringNight",e.target.value)} 
                  slotProps={{ inputLabel:{shrink: true},htmlInput: { max: 10, min: 0 ,step: 1}}} 
                />
              </Grid>
              <Grid size={4}>
                <TextField 
                  label={"Waking Up Time"} variant="outlined" fullWidth type="number" value={formData.approxWakingNum} 
                  onChange={(e)=>handleFormChange("approxWakingNum",e.target.value)} 
                  slotProps={{ inputLabel:{shrink: true},htmlInput: { max: 10, min: 0 ,step: 1}}} 

                />
              </Grid>


              
              

              <Grid size={12} >
                <LexicalEditor value={formData.note} onChange={handleFormChange} formKey="note" />
              </Grid>
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