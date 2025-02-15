import {Button,ListItem}            from '@mui/material';
import { NavLink as RouterLink }    from 'react-router-dom';

const listItem = ({action,icon,text,link}) => {
  return (
    <ListItem component="div">
        <Button disableRipple component={RouterLink} onClick={action} to={link} startIcon={icon}>
          {text}
        </Button>
    </ListItem>
  )
}


export default listItem