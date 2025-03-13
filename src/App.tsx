import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { AdapterDayjs }         from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider }  from '@mui/x-date-pickers'

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

import { useDispatch, useSelector } from 'react-redux'
import { RootState }                from './store/Reducer';
import { AppDispatch }              from './store/index';
import { fetchDailyId }            from './store/slice/daily';


function App() {
  const content = useRoutes(router);

  // const dispatch    = useDispatch<AppDispatch>();
  const dispatch        = useDispatch<any>();
  dispatch(fetchDailyId("notes/daily/select_date"));

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
