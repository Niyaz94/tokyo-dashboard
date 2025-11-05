import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const TextSearch = ({label = "Search Text",defaultValue = "",defaultOperation = "contains",onChange,debounce = 600,}) => {
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

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange?.({ operator, value: newValue });
    }, debounce);
  };

  const operatorLabels = {
    contains: "Contains",
    equals: "Equals",
    startsWith: "Starts with",
    endsWith: "Ends with",
    notContains: "Does not contain",
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        label={`${label} (${operatorLabels[operator]})`}
        type="text"
        value={value}
        onChange={handleValueChange}
        size="medium"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Select text filter operation">
                  <IconButton size="small" onClick={handleMenuOpen}>
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          },
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {Object.entries(operatorLabels).map(([key, label]) => (
          <MenuItem key={key} onClick={() => handleOperatorSelect(key)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TextSearch;