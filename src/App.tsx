import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { AdapterDayjs }         from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider }  from '@mui/x-date-pickers'

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

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
