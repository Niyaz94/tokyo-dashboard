import { useState, useRef } from 'react';
import {
  Box,Menu,IconButton,Button,ListItemText,ListItemButton,List,Typography,Tooltip
}                           from '@mui/material';
import DeleteTwoToneIcon    from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon  from '@mui/icons-material/MoreVertTwoTone';
import EditIcon             from '@mui/icons-material/Edit';
import ConfirmDialog        from '../Custom/Dialog/ConfirmDialog';


function TableHeaderMultiActions({deletefun}) {
  const [onMenuOpen, menuOpen]  = useState<boolean>(false);
  const moreRef                 = useRef<HTMLButtonElement | null>(null);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);


  const openMenu = (): void => {menuOpen(true);};
  const closeMenu = (): void => {menuOpen(false);};

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">Bulk actions:</Typography>

          <Tooltip title={`Delete Selected Rows`} arrow>
            <Button
                  variant="outlined" color="error" onClick={()=> setOpenDeleteConfirmDialog(true)}
                  startIcon={<DeleteTwoToneIcon />}
                  sx={{fontSize: '1rem',ml:1,padding: '10px 32px',borderRadius: '10px', borderWidth:"2px", textTransform: 'none',boxShadow: 3}}
              >
                  Delete
            </Button>
          </Tooltip>
          <ConfirmDialog 
            title={`Would you like to delete the selected rows?` }
            open={openDeleteConfirmDialog} 
            setOpen={setOpenDeleteConfirmDialog} 
            onConfirm={()=>deletefun()}
          >

        <Typography>Are you sure you want to delete selected rows?</Typography>
      </ConfirmDialog>

          <Tooltip title={`Edit Selected Rows`} arrow>
          <Button
                variant="outlined" color="primary" onClick={()=> console.log("Edit selected")}
                startIcon={<EditIcon />}
                sx={{fontSize: '1rem',ml:1,padding: '10px 32px',borderRadius: '10px', borderWidth:"2px", textTransform: 'none',boxShadow: 3}}
            >
                Multi Edit
          </Button>
          </Tooltip>

        </Box>
        <IconButton color="primary" onClick={openMenu} ref={moreRef} sx={{ ml: 2, p: 1 }}>
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
      <Menu keepMounted anchorEl={moreRef.current} open={onMenuOpen} onClose={closeMenu}
        anchorOrigin={{vertical: 'center',horizontal: 'center'}} transformOrigin={{vertical: 'center',horizontal: 'center'}}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItemButton ><ListItemText  primary="Bulk delete selected" /></ListItemButton>
          <ListItemButton><ListItemText   primary="Bulk edit selected" /></ListItemButton>
        </List>
      </Menu>
    </>
  );
}

export default TableHeaderMultiActions;
