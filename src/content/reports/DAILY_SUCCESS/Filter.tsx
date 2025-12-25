
import { useState} from 'react'
import {CustomDatePicker,StaticAutocomplete,CustomSwitch}       from '../../../components/Form';
import {Card,CardHeader,CardContent,Divider,Box} from '@mui/material';
import Grid from '@mui/material/Grid';

import { Stack, Button } from '@mui/material';
import {axiosGetData} from '../../../utility/Axios'
import dayjs                  from 'dayjs';
import MultiplePieCharts from './PIE';





const DataTable = () => {

  const stateType=[
    {value:'all',label:'All'},
    {value:'busy',label:'How Busy The Day'},
    {value:'med',label:'Did You Do Meditation'},
    {value:'music',label:'Did You Listen To Music'},
    {value:'greatful',label:'Did You Being Greatful'},
    {value:'success',label:'Binary Success Rate'},
    {value:'info',label:'Info Consumption Level'},
    {value:'worring',label:'Worring Level'},
  ]
  const FormIntialState ={
    startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    type:"all",
    month:true
  }

  const [formData, setFormData] = useState(FormIntialState);
  const [result, setResult] = useState([]);


  const handleFormChange = ((key, value) => {
    setFormData((prev) => ({...prev,[key]: value}));
  });

  const sent_report_request = () => {
    let param="";
    for(const [key,value] of Object.entries(formData)){
      if(value!=null && value!=''){
        if(Array.isArray(value)){
          if(value.length>0)
            value.forEach((val)=>{param+=`${key}=${val}&`;})
        }else{
          param+=`${key}=${value}&`;
        }
      }
    }
    if(param.endsWith('&')){
      param=`?${param.slice(0,-1)}`;
    }
    axiosGetData(`http://127.0.0.1:8000/reports/daily_success/${param}`).then((res) => {
      setResult(res.data);
    });
    
  }
  
  
  return (<>
    <Card>
        <CardHeader title="Monthly Success" />
        <Divider />
        <CardContent>
          <Box component="form" noValidate autoComplete="off"
            sx={{mt: 2,p: 2,display: 'flex',flexDirection: 'column',gap: 2,margin: '0 auto'}}
          >
            <Grid container spacing={2}>

              <Grid size={4}>
                <CustomDatePicker
                  label="Start Date"
                  value={formData.startDate}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('startDate', newValue )}
                />
              </Grid>
              <Grid size={4}>
                <CustomDatePicker
                  label="End Date"
                  value={formData.endDate}
                  placeholder=""
                  onChange={(newValue) => handleFormChange('endDate', newValue )}
                />
              </Grid>
              <Grid size={4}>
                <StaticAutocomplete
                  label="Field To Compare"
                  showValueInLabel={false}
                  defaultValue={stateType.filter((item) => item.value === formData.type)[0]}
                  options={stateType}
                  formKey="type"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={12}>
                <CustomSwitch 
                  value={formData.month}
                  onChange={(newValue) => handleFormChange('month', newValue)}
                  label="Consider Month"
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
    <Card>
        <CardHeader title="Daily Success Detail" />
        <Divider />
        <CardContent>
          { result.length>0 && <MultiplePieCharts data={result} considerMonth={formData.month && formData.type!="all"} />}
        </CardContent>
    </Card>
  </>);
};
export default DataTable;