import {Button,Dialog,IconButton,Box}   from "@mui/material";
import DialogActions                from '@mui/material/DialogActions';
import DialogContent                from '@mui/material/DialogContent';
import DialogTitle                  from '@mui/material/DialogTitle';
import CloseIcon                    from '@mui/icons-material/Close';

const ConfirmDialog = ({title, children, open, setOpen, onConfirm}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)} color="secondary">
          No
        </Button>
        <Button variant="contained" color="error" onClick={() => {setOpen(false);onConfirm();}}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
