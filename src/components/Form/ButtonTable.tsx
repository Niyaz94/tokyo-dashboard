import { 
  Stack,Tooltip,IconButton ,useTheme,Typography
}                         from '@mui/material';
import {useState }        from 'react';
import EditTwoToneIcon    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon  from '@mui/icons-material/DeleteTwoTone';
import { useNavigate }    from 'react-router-dom';
import ConfirmDialog      from '../../components/Custom/Dialog/ConfirmDialog';



const ButtonTable = ({ id, text,onDeleteRow,onEditButtonClick=null}) => {
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  
  const theme = useTheme();
  const navigate = useNavigate();
 
  return (
    <Stack direction="row" spacing={0.5} sx={{justifyContent: "center",alignItems: "center",}}>
      <Tooltip title={`EDIT ${text.toUpperCase()}`} arrow>
        <IconButton 
          color="inherit" onClick={() => {
            if (typeof onEditButtonClick === 'function') {
              onEditButtonClick();
            }
            navigate(`${id}`);
          }}  size="medium" 
          sx={{'&:hover': {background: theme.colors.primary.lighter},color: theme.palette.primary.main}} 
        >
          <EditTwoToneIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Delete ${text.toUpperCase()}`} arrow>
        <IconButton 
            color="inherit" size="medium" onClick={()=>setOpenDeleteConfirmDialog(true)} 
            sx={{'&:hover': { background: theme.colors.error.lighter },color: theme.palette.error.main}}  
        >
          <DeleteTwoToneIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <ConfirmDialog 
        title={`Would you like to delete ${text} row with id ${id}?` }
        open={openDeleteConfirmDialog} 
        setOpen={setOpenDeleteConfirmDialog} 
        onConfirm={()=>onDeleteRow(id)}
      >
        <Typography>Are you sure you want to delete this {text} row?</Typography>
      </ConfirmDialog>
    </Stack>
  );
};

export default ButtonTable;