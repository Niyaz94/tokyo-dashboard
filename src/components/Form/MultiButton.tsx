import { Stack, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
    width:"300px",
    "&:hover": {
      backgroundColor: "darkblue",
    },
  },
});

interface MultiButtonProps {
  type: 'edit' | 'insert';
  saveContinue: () => void;
  saveReturn: () => void;
  returnUrl?: string;
  page_name?: string;
}

const MultiButton = ({ type, saveContinue, saveReturn, returnUrl,page_name="" }:MultiButtonProps) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [saveContinueText,saveReturnText] = type == "edit" ?["Save And Continue Editing","Edit And Return"]:["Save And Add Another","Save And Return"]
 
  return (
    <Stack spacing={2} direction="row-reverse">
      <Button
        variant="outlined"
        // color="warning"
        classes={{ root: classes.root }}
        onClick={() => navigate(returnUrl,{state:{page_name}})}
        sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
      >
        Return To List
      </Button>
      <Button
        variant="outlined"
        color="info"
        onClick={saveContinue}
        sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
      >
        {saveContinueText}
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={saveReturn}
        sx={{fontSize: '1rem',padding: '10px 20px',borderRadius: '8px',textTransform: 'none'}}
      >
        {saveReturnText}
      </Button>
    </Stack>
  );
};

export default MultiButton;