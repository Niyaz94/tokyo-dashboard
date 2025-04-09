import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import {applyPagination,applyFilters,applyFilterValue} from '../../../utility/function/main';
import { filterStatusOptions } from '../../../utility/function/data';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import useDeleteAPI from '../../../utility/customHook/useDeleteAPI';
import { useTaskStatus } from '../../../store/tastStatusContext';
import {
  TaskStatusSingleSampleInterface as SingleSampleInterface,Filters
} from 'src/utility/types/data_types';


const DataTable = () => {
  const { table: tableData,setTable } = useTaskStatus();
  const navigate = useNavigate();
  const {response: deleteRowResponse,loading,error,deleteData} = useDeleteAPI();

  // it contains the ids of selected rows
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  // it let you know if any rows have been selected
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ status: null });
  const [filteredPageData, setFilteredPageData] = useState<
    SingleSampleInterface[]
  >([]);
  const [paginatedPageData, setPaginatedPageData] = useState<
    SingleSampleInterface[]
  >([]);

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
    setFilteredPageData(
      applyFilters<SingleSampleInterface, Filters>(tableData,filters,'task_name')
    );
  }, [tableData, filters]);

  useEffect(() => {
    const newPaginatedData = applyPagination<SingleSampleInterface>(filteredPageData,page,limit);
    setPaginatedPageData(newPaginatedData);
  }, [filteredPageData, page, limit]);


  // It uses for controlling filter selection in the left top cornor of the table
  //The list of all options in filter selection in the left top cornor of the table

  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
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
  // it [add/remove] row ids to [selectedTableData] variable when the user [select/deselect] row
  const handleSelectOnePageData = (event: ChangeEvent<HTMLInputElement>,pageId: string): void => {
    if (!selectedTableData.includes(pageId)) {
      setSelectedTableData((prevSelected) => [...prevSelected, pageId]);
    } else {
      setSelectedTableData((prevSelected) =>
        prevSelected.filter((id) => id !== pageId)
      );
    }
  };
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // it will be [true] if some but not all rows are selected
  const selectedSomePageData =
    selectedTableData.length > 0 && selectedTableData.length < tableData.length;
  // It will be [true] if all rows are selected
  const selectedAllPageData = selectedTableData.length === tableData.length;

  const deleteTableRow = async (id) => {
    await deleteData(`schedule/task_status/${id}/`);
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
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                  {filterStatusOptions.map(({ id, name }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))}
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
                <Checkbox
                  color="primary" checked={selectedAllPageData}
                  indeterminate={selectedSomePageData} onChange={handleSelectAllPageData}
                />
              </TableCell>
              <TableCell align="center">Progress Date</TableCell>
              <TableCell align="center">Task Detail</TableCell>
              <TableCell align="center">Note</TableCell>
              <TableCell align="center">Prize</TableCell>
              <TableCell align="center">Progress Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPageData.map((row) => {
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
        count={filteredPageData.length}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default DataTable;
