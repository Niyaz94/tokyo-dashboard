import React from "react";
import { Box,TablePagination } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  return (
    <Box p={2}>
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 30]}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
    </Box>
    
  );
};

export default CustomPagination;
