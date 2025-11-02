import React, { useState } from "react";
import {
  Box,
  Collapse,
  FormControl,
  Button,
  IconButton,
  Typography,
  Grid,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import {FieldRenderer}       from '../../components/Form';
import { D } from "react-router/dist/development/fog-of-war-Ckdfl79L";




const FilterPanel = ({ filters, handleFilterChange, filterFields }) => {
  const [open, setOpen] = useState(false);

  return (
    <Paper elevation={12} variant="outlined" sx={{p: 1,my: 1,borderRadius: 2,bgcolor: "background.paper"}}>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="h4" fontWeight={600}>
          Filters
        </Typography>
        <IconButton onClick={() => setOpen(!open)} color="primary">
          {open ? <CloseIcon /> : <FilterListIcon />}
        </IconButton>
      </Box>
      {open && <Divider />}

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap sx={{mt: 1,px:2, justifyContent: "flex-start"}}>
          {
            filterFields.map((field, i) => (
                <FieldRenderer 
                    key={i} field={field} error={[]} formData={filters} 
                    handleFormChange={handleFilterChange} 
                />
            ))
          }

          {/* You can add more fields like this */}
          {/* <FormControl sx={{ minWidth: 200, flexGrow: 1 }}>...</FormControl> */}
        </Stack>

        <Box display="flex" justifyContent="flex-end" mt={2} gap={1} px={2} pb={2}>
          <Button variant="outlined" size="large" onClick={() => handleFilterChange("reset")}>
            Reset
          </Button>
          {/* <Button variant="contained" color="primary">
            Apply
          </Button> */}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FilterPanel;