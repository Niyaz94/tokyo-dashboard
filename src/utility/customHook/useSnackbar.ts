// hooks/useSnackbar.ts
import { useState } from 'react';
import { SnackbarType } from '../../utility/types/data_types';


export default () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarType>('info');

  const showSnackbar = (msg: string, type: SnackbarType = 'info') => {

    // if (msg.length==0 && type === 'error') {
    //   msg = "An unknown error occurred.";
    // }

    if (msg.length >0) {
      setMessage(msg);
      setSeverity(type);
      setOpen(true);
    }
    
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return {open,message,severity,showSnackbar,closeSnackbar};
};
