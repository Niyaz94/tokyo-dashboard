import {ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import {useDeleteAPI,useAPI} from '../../../utility/customHook';
import { usePaginationContext } from '../../../store/context/paginationContext';

import { useSelector,useDispatch }    from 'react-redux';
import { RootState }                  from '../../../store/Reducer';
import {setPage,setLimit}             from '../../../store/slice/tablePagination';
import { SelectChangeEvent } from "@mui/material";

const DataTable = () => {
  const { page, limit } = useSelector((state: RootState) => state.tablePagination.filter((item) => item.name === 'goal')[0]);
  const dispatch        = useDispatch();
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {goal_status,goal_level} = secondary;



  const navigate = useNavigate();
  const {deleteData} = useDeleteAPI();

  // it contains the ids of selected rows
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  const [filters, setFilters] = useState<{status:string,importance:string,difficulty:string}>({ 
    status: "ALL" ,
    importance: "ALL",
    difficulty: "ALL"
  });
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

  const {results,count,next,previous} = useAPI<any>(`schedule/goal/?importanceLevel=${filters.importance}&difficultyLevel=${filters.difficulty}&currentStatus=${filters.status.toUpperCase()}&page=${page+1}&page_size=${limit}`);
  useEffect(() => {    
    setTable(results);
    setPagination({count: count, next: next, previous: previous});
  }, [count,next,previous]);


  // It uses for controlling filter selection in the left top cornor of the table
  //The list of all options in filter selection in the left top cornor of the table

  //The action handler for filter selection in the left top cornor of the table
  const handleTableFilter = (e: SelectChangeEvent<string>,filterType:string): void => {
    let value = 'ALL';
    if (e.target.value !== 'ALL') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
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
    dispatch(setPage({ name: 'goal', page: newPage }));
  };
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLimit({ name: 'goal', limit: parseInt(event.target.value) }));
  };

  // it will be [true] if some but not all rows are selected
  const selectedSomePageData =
    selectedTableData.length > 0 && selectedTableData.length < tableData.length;
  // It will be [true] if all rows are selected
  const selectedAllPageData = selectedTableData.length === tableData.length;

  const deleteTableRow = async (id) => {
    await deleteData(`schedule/goal/${id}/`);
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
          {/* <BulkActions /> */}
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
            <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 2,}}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <InputLabel>Importance</InputLabel>
                  <Select value={filters.importance || 'ALL'} onChange={(event)=>(handleTableFilter(event,"importance"))} label="Importance Level" autoWidth>
                    {["ALL", ...goal_level].map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <InputLabel>Difficulty</InputLabel>
                  <Select value={filters.difficulty || 'ALL'} onChange={(event)=>(handleTableFilter(event,"difficulty"))} label="Difficulty Level" autoWidth>
                    {["ALL", ...goal_level].map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={filters.status || 'ALL'} onChange={(event)=>(handleTableFilter(event,"status"))} label="Status" autoWidth>
                    {["ALL", ...goal_status].map((name) => (
                      <MenuItem key={name} value={name}>
                        {name.replace(/_/gi, " ").toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('add')}
                  sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}
                >
                  Insert
                </Button>
              </Box>
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
              <TableCell align='center'>Importance Level</TableCell>
              <TableCell align='center'>Title</TableCell>
              <TableCell align="center">Difficulty Level</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right" >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => {
              return (
                <CustomTableRow
                  data={row} 
                  isDataSelected={selectedTableData.includes(row.id)}
                  handleSelectOneData={handleSelectOneData} 
                  onDeleteRow={deleteTableRow}
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
