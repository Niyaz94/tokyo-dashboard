import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup,Stack,Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { styled } from '@mui/material/styles';


const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.MuiToggleButton-root': {
    '&:hover': {
      backgroundColor: "rgb(165, 165, 165)",
    },
  },
  '&.Mui-selected': {
    color: theme.palette.common.white,
    backgroundColor: "rgb(205, 235, 235)",
    '&:hover': {
      backgroundColor: "rgb(165, 165, 165)",
    },
  },
}));


interface ThreeStateSwitchProps {
  label?: string;
  onChange: (newValue: string) => void;
  buttonValue?: {
    [key: string]:string
  };
  defaultValue?: string;
}

export default function ThreeStateSwitch({label,onChange,buttonValue={"on":"on","off":"off","auto":"auto"},defaultValue="auto"}: ThreeStateSwitchProps) {

  console.log("ThreeStateSwitch",defaultValue);
  // const [value, setValue] = useState<string | null>(defaultValue);

  const handleChange = (event: React.MouseEvent<HTMLElement>,newValue: string | null) => {
    if (newValue !== null && onChange) {
      // setValue(newValue);
      onChange(newValue);
    }
  };

  return (
        <Stack direction="row" spacing={2} alignItems="center" >
          
          <ToggleButtonGroup size="small" value={defaultValue} exclusive onChange={handleChange} aria-label="three-state switch">
            <StyledToggleButton value={buttonValue.off} >
                <ThumbDownAltIcon color="error" />
            </StyledToggleButton>
            <StyledToggleButton value={buttonValue.auto} >
              <SentimentNeutralIcon color="secondary" />
            </StyledToggleButton>
            <StyledToggleButton value={buttonValue.on}>
                <ThumbUpAltIcon color="success" />
            </StyledToggleButton>
          </ToggleButtonGroup>

          <Typography variant="body1" gutterBottom>
            {label}
          </Typography>
        </Stack>
    
  );
}
