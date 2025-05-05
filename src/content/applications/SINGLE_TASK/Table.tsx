import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import useDeleteAPI from '../../../utility/customHook/useDeleteAPI';
import { usePaginationContext } from '../../../store/context/paginationContext';

import { useSelector,useDispatch }    from 'react-redux';
import { RootState }                  from '../../../store/Reducer';
import {setPage,setLimit}             from '../../../store/slice/tablePagination';
import {axiosGetData} from '../../../utility/Axios'


const DataTable = () => {
  const { page, limit } = useSelector((state: RootState) => state.tablePagination.filter((item) => item.name === 'singleTask')[0]);
  const dispatch        = useDispatch();
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {status:single_task_status,priority:single_task_priority,type:single_task_type } = secondary;
  const navigate = useNavigate();
  const {response: deleteRowResponse,loading,error,deleteData} = useDeleteAPI();

  // it contains the ids of selected rows
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  const [filters, setFilters] = useState<{status:string}>({ status: "all" });
  const selectedBulkActions = selectedTableData.length > 0;

  const handleSelectOneData = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedTableData.includes(id)) {
      setSelectedTableData((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedTableData((prevSelected) =>
        prevSelected.filter((singleId) => singleId !== id)
      );
    }
  };

  useEffect(() => {
    axiosGetData(`schedule/stask/?status=${filters.status.toLowerCase()}&page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters]);


  // It uses for controlling filter selection in the left top cornor of the table
  //The list of all options in filter selection in the left top cornor of the table

  //The action handler for filter selection in the left top cornor of the table
  const handleTableFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = 'all';
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };
  // The checkbox inside the [table header] which either make all rows [selected/unselected]
  const handleSelectAllPageData = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTableData(
      event.target.checked ? tableData.map(({ id }) => id) : []
    );
  };
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {
    const direction = newPage > page ? 'next' : 'previous'; // To know the direction of page change
    dispatch(setPage({ name: 'singleTask', page: newPage }));
  };
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLimit({ name: 'singleTask', limit: parseInt(event.target.value) }));
  };

  // it will be [true] if some but not all rows are selected
  const selectedSomePageData =
    selectedTableData.length > 0 && selectedTableData.length < tableData.length;
  // It will be [true] if all rows are selected
  const selectedAllPageData = selectedTableData.length === tableData.length;

  const deleteTableRow = async (id) => {
    await deleteData(`schedule/stask/${id}/`);
    setTable((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <Card>
      <Box p={2}>
        {/* <TableFilter /> */}
        {/* <TableFilter onFilterChange={(filters) => console.log(filters)} /> */}
      </Box>
      {/* When user select a row or more this panel will open */}
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {/* When user does not select any rows this panel will open (default one) */}
      {!selectedBulkActions && (
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
                <Select value={filters.status || 'all'} onChange={handleTableFilter} label="Status" autoWidth>
                  {/* {single_task_status.map((val) => (<MenuItem key={val} value={val}>{val}</MenuItem>))} */}
                  {["all",...single_task_status].map((name) => (<MenuItem key={name} value={name}>{name.replace(/_/gi, " ").toUpperCase()}</MenuItem>))}

                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={selectedAllPageData} indeterminate={selectedSomePageData} onChange={handleSelectAllPageData}/>
              </TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Task Type</TableCell>
              <TableCell align='center'>Title</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => {
              return (
                <CustomTableRow
                  data={row} isDataSelected={selectedTableData.includes(row.id)}
                  handleSelectOneData={handleSelectOneData} onDeleteRow={deleteTableRow}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
