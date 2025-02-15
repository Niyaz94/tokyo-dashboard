import React, { useState } from "react";
import { Tabs, Tab, Badge, TextField, Box, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const statusOptions = [
    { label: "All", value: "all", count: 20 },
    { label: "Pending", value: "pending", count: 6 },
    { label: "Completed", value: "completed", count: 10 },
    { label: "Cancelled", value: "cancelled", count: 2 },
    { label: "Refunded", value: "refunded", count: 2 },
];


interface OrderFiltersProps {
    onFilterChange: (status: string) => void;
}



const OrderFilters : React.FC<OrderFiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");


  const handleFilterChange = () => {
    // onFilterChange({ status, startDate, endDate, searchQuery });
  };

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    onFilterChange(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      {/* Status Tabs */}
      <Tabs 
            value={activeTab} 
            onChange={handleChange} 
            variant="scrollable"
            TabIndicatorProps={{
                style: {
                    backgroundColor: "transparent"
                }
            }}
        >
        {statusOptions.map((status) => (
          <Tab
            key={status.value}
            value={status.value}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span>{status.label}</span>
                <Badge
                  badgeContent={status.count}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: activeTab === status.value ? "black" : "#ddd",
                      color: activeTab === status.value ? "white" : "black",
                      fontSize: 12,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            }
            sx={{
              textTransform: "none",
              fontWeight: activeTab === status.value ? "bold" : "normal",
              border: "none",
              borderBottom: activeTab === status.value ? "2px solid black" : "none",
              bgcolor: "transparent", // 🔹 Removes active tab background color
              "&.Mui-selected": {
                color: "black",
              },
                "&.Mui-selected:hover": {
                    color: "black"

                },
            }}
          />
        ))}
      </Tabs>

      {/* Date Pickers & Search */}
      <Box display="flex" gap={2}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <TextField
          label="Search customer or order number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default OrderFilters;










