import {Button}            from '@mui/material';
import { NavLink as RouterLink }    from 'react-router-dom';

const ButtonItem = ({action,icon,text,link}) => {
  return (
    <Button disableRipple component={RouterLink} onClick={action} to={link} startIcon={icon}>
      {text}
    </Button>
  )
}


export default ButtonItem