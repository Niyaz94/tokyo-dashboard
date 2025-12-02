

import {FC,useState,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

interface AlertProps {
    title:string;
    message:string;
    severity: 'error' | 'warning' | 'info' | 'success';
    openDefault: boolean;
}
const CustomAlert:FC<AlertProps> = ({title,message,severity='success',openDefault=false}) => {


    const [open, setOpen] = useState(openDefault);

    useEffect(() => {
        setOpen(openDefault);
    }, [openDefault,message]);



    return <Collapse in={open} >
      <Alert severity={severity} action={
        <IconButton aria-label="close" color="inherit" size="medium" onClick={() => {setOpen(false);}}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
}

export default CustomAlert;