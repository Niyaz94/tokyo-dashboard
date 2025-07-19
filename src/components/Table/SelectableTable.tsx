import React, {ChangeEvent} from 'react';
import {Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Checkbox} from '@mui/material';
import {Column} from '../../utility/types/data_types';



interface SelectableTableProps<T> {
  data: T[];
  columns: Column[];
  selectedIds: string[];
  onSelectAll: (event:ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (event: ChangeEvent<HTMLInputElement>,id: string) => void;
  renderRow: (item: T) => React.ReactNode;
}

export const SelectableTable = <T extends { id: string }>({data,columns,selectedIds,onSelectAll,onSelectOne,renderRow}: SelectableTableProps<T>) => {
  const allSelected = selectedIds.length === data.length && data.length > 0;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox 
                color="primary" checked={allSelected} indeterminate={someSelected} onChange={onSelectAll}
              />
            </TableCell>
            {columns.map((col, idx) => (
              <TableCell key={idx} align={col.align || 'left'}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => renderRow(row))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
