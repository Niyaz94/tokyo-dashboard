import React, { useState,useEffect } from 'react';
import {Card,CardHeader,CardContent,Divider,Stack,Box,TextField,Button} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useNavigate,useParams } from 'react-router-dom';
import dayjs                     from 'dayjs';

import LexicalEditor        from '../../../components/Custom/Lexical/Editor';
import TimePickers          from '../../../components/Form/TimePickers';
import DynamicAutocomplete  from '../../../components/Form/DynamicAutocomplete';
import StaticAutocomplete   from '../../../components/Form/StaticAutocomplete';

import Template             from '../../../components/Page/Template';
import { sleepStatus }      from '../../../utility/function/data';
import usePostAPI           from '../../../utility/customHook/usePostAPI';
import useEditAPI           from '../../../utility/customHook/useEditAPI';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

type FormState = {
  id: number;
  bedTime: dayjs.Dayjs;
  approxFellSleepTime: string | null;
  morningWakingUp: string;
  SleepState: string;
  morningFeeling: string;
  daily: string;
  whatYouThink: string;
  dayTimeSleepInMinutes: number;
  peeCountDuringNight: number;
  approxWakingNum: number;
};

const formIntialState:FormState = {
  id: 0,
  bedTime: dayjs(),
  approxFellSleepTime: null,
  morningWakingUp: '09:00:00',
  SleepState: '',
  morningFeeling: '',
  daily: '',
  whatYouThink: '{}',
  dayTimeSleepInMinutes: 0,
  peeCountDuringNight: 0,
  approxWakingNum: 0
};

const CollapsibleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id:edit_sleep_id } = useParams();

  // const { data, loading, error } = useGetAPI(id ? `items/${id}` : null);
  const { data:fetchEditData,success:editReturnSuccess}: FetchData<FormState> = useFetch <FormState>(edit_sleep_id ?`notes/sleep/${edit_sleep_id}`: null,{});


  const buttonText = edit_sleep_id ? {save: "Edit And Return",saveAndAdd: "Save And Continue Editing"}:{save: "Save And Return",saveAndAdd: "Save And Add Another"}

  const { loading:post_api_loading, error:post_api_error, success,response, postData} = usePostAPI();
  const { response:editResponse, loading:editLoading, error:editError, editData} = useEditAPI();

  const [formData, setFormData] = useState(formIntialState);


  useEffect(() => {
    if (Object.keys(fetchEditData).length > 0) {
      setFormData({
        ...fetchEditData
      });
    }
  }, [fetchEditData]);


  const handleFormChange = (key, value, dataType = 'normal') => {
    let currentValue = value;

    // if(dataType === 'time'){
    //   currentValue=dayjs(value);
    // }
    setFormData((prev) => ({
      ...prev,
      [key]: currentValue
    }));
  };

  const handleSave = async () => {
  

    const { id, ...dataToBeSent } = formData; // Destructure once

    if (edit_sleep_id) {
      await editData(`notes/sleep/${edit_sleep_id}/`, formData);
    }else{
      await postData("notes/sleep/", dataToBeSent);
    }
    
  };
  const cleanForm = () => {
    setFormData(formIntialState)
  };
  return (
    <Template templateTitle="Personal - Sleep">
      <Card>
        <CardHeader title="Input Fields" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>
              <Grid size={4}>
                <TimePickers
                  label="Bed Time"
                  value={formData.bedTime}
                  onChange={(newValue) => handleFormChange('bedTime', newValue)}
                />
              </Grid>
              <Grid size={4}>
                <TimePickers
                  label="Fell Sleep Time"
                  value={formData.approxFellSleepTime}
                  onChange={(newValue) =>
                    handleFormChange('approxFellSleepTime', newValue)
                  }
                />
              </Grid>
              <Grid size={4}>
                <TimePickers
                  label="Waking Up Time"
                  value={dayjs(formData.morningWakingUp, 'HH:mm:ss')}
                  onChange={(newValue) =>
                    handleFormChange('morningWakingUp', newValue)
                  }
                />
              </Grid>
              <Grid size={4}>
                <DynamicAutocomplete
                  label="Select The Day"
                  endpoint="notes/daily/select_date"
                  formKey="daily"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Morning Feeling"
                  options={sleepStatus}
                  formKey="morningFeeling"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Sleep State"
                  options={sleepStatus}
                  formKey="SleepState"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Day Time Sleep'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.dayTimeSleepInMinutes}
                  onChange={(e) =>
                    handleFormChange('dayTimeSleepInMinutes', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 600, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Pee Count During Night'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.peeCountDuringNight}
                  onChange={(e) =>
                    handleFormChange('peeCountDuringNight', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label={'Waking Up Time'}
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.approxWakingNum}
                  onChange={(e) =>
                    handleFormChange('approxWakingNum', e.target.value)
                  }
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { max: 10, min: 0, step: 1 }
                  }}
                />
              </Grid>
              <Grid size={12}>
                <LexicalEditor
                  value={formData.whatYouThink}
                  onChange={handleFormChange}
                  formKey="whatYouThink"
                />
              </Grid>
              <Grid size={12}>
                <Stack spacing={2} direction="row-reverse">
                  <Button
                    variant="outlined" color="warning" onClick={() => navigate('/personal/sleep')}
                    sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
                  >
                    Return To List
                  </Button>
                  <Button
                    variant="outlined" color="info" onClick={()=>handleSave().then(()=>cleanForm())}
                    sx={{fontSize: '1rem', padding: '10px 20px', borderRadius: '8px', textTransform: 'none'}}
                  >
                    {buttonText.saveAndAdd}
                  </Button>

                  <Button
                    variant="outlined" color="success" onClick={()=>handleSave().then(()=>navigate('/personal/sleep'))}
                    sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
                  >
                    {buttonText.save}
                  </Button>
                  
                </Stack>
              </Grid>
            </Grid>
            {post_api_error && <p style={{ color: "red" }}>Error: {post_api_error}</p>}
            {success && <p style={{ color: "green" }}>Success! Data submitted.</p>}
            {response && response.data && (
              <pre>Response: {JSON.stringify(response.data, null, 2)}</pre>
            )}
          </Box>
        </CardContent>
      </Card>
    </Template>
  );
};

export default CollapsibleForm;
