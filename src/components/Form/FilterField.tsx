import React, { useState,useRef,useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Tooltip,
  FormControl
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList"; // or Tune, MoreVert, etc.

const NumberFilter = ({ label = "Amount",defaultValue=0,defaultOperation="eq", onChange,debounce = 600}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [operator, setOperator] = useState(defaultOperation);
  const [value, setValue] = useState(defaultValue);
  const debounceTimer = useRef(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleOperatorSelect = (op) => {
    setOperator(op);
    handleMenuClose();
    onChange?.({ operator: op, value });
  };


  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // clear old timer before starting a new one
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // wait until user stops typing for `debounce` ms
    debounceTimer.current = setTimeout(() => {
      onChange?.({ operator, value: newValue });
    }, debounce);
  };

  useEffect(() => {
    // cleanup on unmount
    return () => clearTimeout(debounceTimer.current);
  }, []);

  const operatorLabels = {
    eq: "= Equal",
    lt: "< Less",
    lte: "≤ Less or Equal",
    gt: "> Greater",
    gte: "≥ Greater or Equal",
  };

  return (
    // <FormControl fullWidth>

        <Box sx={{ width: "100%" }}>
        <TextField
            fullWidth
            
            label={`${label} (${operatorLabels[operator].split(" ")[0]})`}
            type="number"
            value={value}
            onChange={handleValueChange}
            size="medium"
            slotProps={{
                input: {endAdornment: (<InputAdornment position="end">
                <Tooltip title="Select filter operation">
                    <IconButton size="small" onClick={handleMenuOpen}>
                    <FilterListIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                </InputAdornment>)}
            }}
        />

        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <MenuItem onClick={() => handleOperatorSelect("eq")}>= Equal</MenuItem>
            <MenuItem onClick={() => handleOperatorSelect("lt")}>{"<"} Less</MenuItem>
            <MenuItem onClick={() => handleOperatorSelect("lte")}>{"≤"} Less or Equal</MenuItem>
            <MenuItem onClick={() => handleOperatorSelect("gt")}>{">"} Greater</MenuItem>
            <MenuItem onClick={() => handleOperatorSelect("gte")}>{"≥"} Greater or Equal</MenuItem>
        </Menu>
        </Box>
    // </FormControl>
  );
};

export default NumberFilter;