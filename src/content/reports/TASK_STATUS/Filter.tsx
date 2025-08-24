
import { useState,useCallback} from 'react'
import {
  DynamicAutocomplete,CustomDatePicker
}       from '../../../components/Form';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {taskSearch}                from '../../../utility/function/main';
import { Stack, Button } from '@mui/material';



const DataTable = () => {

  const FormIntialState ={
    startDate: null,
    endDate: null,
    tag: '',
    ids:[]
  }

  const [formData, setFormData] = useState(FormIntialState);

  const handleFormChange = ((key, value) => {
    setFormData((prev) => ({...prev,[key]: value}));
  });

  const sent_report_request = () => {
    // Logic to send the report request
    console.log("Report request sent with data:", formData);
  }
  
  
  return (
    <Card>
        <CardHeader title="Monthly Success" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>

              <Grid size={6}>
                <CustomDatePicker
                  label="Start Date"
                  value={formData.startDate}
                  // value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('startDate', newValue )}
                />
              </Grid>
              <Grid size={6}>
                <CustomDatePicker
                  label="End Date"
                  value={formData.endDate}
                  // value={formData.date}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('endDate', newValue )}
                />
              </Grid>
              <Grid size={6} sx={{paddingTop: "10px"}}>
                <TextField
                  label="Task Tag"
                  value={formData.tag}
                  onChange={(e) => handleFormChange('tag', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={6}>
                <DynamicAutocomplete
                  label="Select The Task Names"
                  multiple={true}
                  // defaultValue={[]}
                  fetchOptions={taskSearch}
                  formKey="ids"
                  showValueInLabel={false}
                  onChange={handleFormChange}
                />
              </Grid>
              

              
              <Grid size={12}>
                <Stack spacing={2} direction="row-reverse">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={()=>{}}
                      sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
                    >
                      Print Report
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={sent_report_request}
                      sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
                    >
                      Show Report
                    </Button>
                  </Stack>
              </Grid>
            </Grid>           
          </Box>
        </CardContent>
      </Card>
  );
};
export default DataTable;