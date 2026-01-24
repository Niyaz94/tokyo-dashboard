import {ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import { filterStatusOptions } from '../../../utility/function/data';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import {Filters} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters} from '../../../utility/customHook';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {SelectableTable,TablePagination as CustomPagination,TableHeaderButton} from '../../../components/Table';
import {columnsToday as columns} from '../../../utility/function/tableColumn';
import {axiosGetData} from '../../../utility/Axios'

import { useSelector}          from 'react-redux'
import { RootState }                from '../../../store/Reducer';

const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('today');
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  const loginDetail = useSelector((state: RootState) =>state.auth);



  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();

  // it let you know if any rows have been selected
  const [filters, setFilters] = useState<Filters>({ status: null });

  useEffect(() => {
      axiosGetData(`notes/daily/?page=${page+1}&page_size=${limit}`,loginDetail.token).then((res) => {
        const {results,count,next,previous} = res.data;
        setTable(results);
        setPagination({count: count, next: next, previous: previous});
      });
  }, [ page, limit,filters]);


  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };

  return (
    <Card>
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>
          {/* <BulkActions /> */}
        </Box>
      )}
      {selectedIds.length<1 && (
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">Recent Orders</Typography>
            </Box>
          }
          action={
            <Box width={300} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined" color="primary" onClick={() => navigate('add')}
                sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}
              >
                Insert
              </Button>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                  {filterStatusOptions.map(({ id, name }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      <SelectableTable
        data={tableData} columns={columns} selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        renderRow={(row) => (
          <CustomTableRow
            key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"notes/daily",setTable)}
          />
        )}
      />
      <CustomPagination
        count={pagination.count}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default DataTable;
