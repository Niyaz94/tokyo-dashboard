
import { useState,useCallback, useEffect} from 'react'
import {CustomDatePicker}       from '../../../components/Form';
import {Card,CardHeader,CardContent,Divider,Box} from '@mui/material';
import Grid from '@mui/material/Grid';

import { Stack, Button } from '@mui/material';
import {axiosGetData} from '../../../utility/Axios'
import dayjs                  from 'dayjs';
import MultiplePieCharts from './PIE';





const DataTable = () => {

  const FormIntialState ={
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  }

  const [formData, setFormData] = useState(FormIntialState);
  const [result, setResult] = useState({});


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
    axiosGetData(`http://127.0.0.1:8000/reports/expense-monthly-summary/${param}`).then((res) => {
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
        <CardHeader title="Monthly Expense Overview" />
        <Divider />
        <CardContent>
          { <MultiplePieCharts data={result} />}
        </CardContent>
    </Card>
  </>);
};
export default DataTable;