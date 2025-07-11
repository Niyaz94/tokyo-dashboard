import { FC, ChangeEvent, useState }      from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,TableContainer,
  Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import { 
  GoalSampleInterface as SingleSampleInterface, Filters 
}   from 'src/utility/types/data_types';
import BulkActions                                          from './BulkActions';
import { useCollapseContext }                               from '../../../contexts/CollapseToggle';
import CustomPagination                                     from '../../../components/Table/Pagination';
import { applyPagination,applyFilters,createMapLabelData }  from '../../../utility/function/main';
import CustomTableRow                                       from './TableRow';
// createMapLabelData



const PageDataTable: FC<{ data:[],unique:{goal_level,goal_status} }> = ({ data,unique }) => {

  const {goal_level,goal_status}=unique

  const goalStatusMap=createMapLabelData(goal_status)
  const goalLevelMap=createMapLabelData(goal_level,[6,5,0])


  // it contains the ids of selected rows
  const [selectedData, setSelectedData] = useState<string[]>([]);
  // it let you know if any rows have been selected
  const selectedBulkActions = selectedData.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const { open, toggleOpen } = useCollapseContext();

  // It uses for controlling filter selection in the left top cornor of the table
  const [filters, setFilters] = useState<Filters>({status: null});
  //The list of all options in filter selection in the left top cornor of the table


  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({...prevFilters,status: value}));
  };
  // The checkbox inside the [table header] which either make all rows [selected/unselected]
  const handleSelectAllData = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedData(event.target.checked? data.map(({id}) => id): []);
  };
  // it [add/remove] row ids to [selectedData] variable when the user [select/deselect] row
  const handleSelectOneData = (event: ChangeEvent<HTMLInputElement>,id: string): void => {
    if (!selectedData.includes(id)) {
      setSelectedData((prevSelected) => [...prevSelected,id]);
    } else {
      setSelectedData((prevSelected) =>prevSelected.filter((singleId) => singleId !== id));
    }
  };
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {setPage(newPage);};
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredData     = applyFilters<SingleSampleInterface,Filters>(data, filters,"importanceLevel");
  const paginatedData    = applyPagination<SingleSampleInterface>(filteredData,page,limit);
  // it will be [true] if some but not all rows are selected
  const selectedSomeData = selectedData.length > 0 && selectedData.length < data.length;
  // It will be [true] if all rows are selected
  const selectedAllData  = selectedData.length === data.length;

  return (
    <Card>
      <Box p={2}> 
        {/* <TableFilter /> */}
        {/* <TableFilter onFilterChange={(filters) => console.log(filters)} /> */}
      </Box>
      {/* When user select a row or more this panel will open */}
      {selectedBulkActions && (<Box flex={1} p={2}><BulkActions /></Box>)}
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
                variant="contained" color="primary" onClick={toggleOpen} 
                sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}>
                {open ? 'Close' : 'Insert'}
              </Button>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Importance Level</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Importance Level" autoWidth>
                  {["all",...goal_level].map((name) => (<MenuItem key={name} value={name}>{name.replace(/_/gi, " ").toUpperCase()}</MenuItem>))}
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
                <Checkbox color="primary" checked={selectedAllData} indeterminate={selectedSomeData} onChange={handleSelectAllData}/>
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
            {/* This function [paginatedData] contains current rows after applying [filtering] and [pagination] */}
            {paginatedData.map((row) => {
                return <CustomTableRow 
                  data={row} isDataSelected={selectedData.includes(row.id)} 
                  handleSelectOneData={handleSelectOneData}
                  goalStatusMap={goalStatusMap}
                  goalLevelMap={goalLevelMap}
                />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={filteredData.length}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default PageDataTable;