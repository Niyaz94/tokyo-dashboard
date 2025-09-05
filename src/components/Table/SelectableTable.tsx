import React, {ChangeEvent,useState} from 'react';
import {Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Checkbox,TableSortLabel} from '@mui/material';
import {Column} from '../../utility/types/data_types';



interface SelectableTableProps<T> {
  data: T[];
  columns: Column[];
  selectedIds: string[];
  onSelectAll: (event:ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (event: ChangeEvent<HTMLInputElement>,id: string) => void;
  renderRow: (item: T) => React.ReactNode;
  onTableHeaderClick?: (columnId:string,order:string) => void;
}

const SelectableTable = <T extends { id: string }>({data,columns,selectedIds,onSelectAll,onSelectOne,renderRow,onTableHeaderClick}: SelectableTableProps<T>) => {
  const allSelected = selectedIds.length === data.length && data.length > 0;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');



  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    // If onTableHeaderClick is provided, call it with the new order
    if (onTableHeaderClick) {
      onTableHeaderClick(property, isAsc ? 'desc' : 'asc');
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <TableSortLabel active={orderBy === "id"}  direction={orderBy === "id" ? order : 'asc'} onClick={() => handleSort("id")}>
                <Checkbox color="primary" checked={allSelected} indeterminate={someSelected} onChange={onSelectAll}/>
              </TableSortLabel> 
            </TableCell>
            {
              columns.map(({id,label,align}, idx) => {
                if(idx!=columns.length-1 && id != ""){
                  return (
                    <TableCell key={idx} align={align || 'left'}>
                      <TableSortLabel
                        active={orderBy === id}  
                        direction={orderBy === id ? order : 'asc'}
                        onClick={() => handleSort(id)}
                      >
                        {label}
                      </TableSortLabel>
                    </TableCell>
                  );
                }else{
                  return (
                    <TableCell key={idx} align={align || 'left'}>
                      {label}
                    </TableCell>
                  );
                }
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => renderRow(row))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectableTable;
