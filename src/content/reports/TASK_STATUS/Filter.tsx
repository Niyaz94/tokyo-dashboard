
import { useState,useCallback} from 'react'
import {
  DynamicAutocomplete,CustomDatePicker
}       from '../../../components/Form';
import {Card,CardHeader,CardContent,Divider,Box,TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {taskSearch}                from '../../../utility/function/main';


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
                  label="Title"
                  value={formData.tag}
                  onChange={(e) => handleFormChange('tag', e.target.value)}
                  fullWidth
                />
              </Grid>  
              <Grid size={6}>
                <DynamicAutocomplete
                  label="Select The Task"
                  multiple={true}
                  // defaultValue={[]}
                  fetchOptions={taskSearch}
                  formKey="ids"
                  onChange={handleFormChange}
                />
              </Grid>
              

              
              <Grid size={12}>
                
              </Grid>
            </Grid>           
          </Box>
        </CardContent>
      </Card>
  );
};
export default DataTable;