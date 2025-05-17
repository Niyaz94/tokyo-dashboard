// components/CustomSnackbar.tsx
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarType } from '../../utility/types/data_types';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity?: SnackbarType;
  onClose: () => void;
  autoHideDuration?: number;
}

const CustomSnackbar = ({open,message,severity = 'info',onClose,autoHideDuration = 3000}: CustomSnackbarProps) => {
  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={autoHideDuration} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
