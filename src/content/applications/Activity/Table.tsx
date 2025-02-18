import { FC, ChangeEvent, useState }      from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,TableContainer,
  Select,MenuItem,Typography,useTheme,CardHeader,Button
} from '@mui/material';
import { RecentActivityTableInterface,ActivityType, Filters }   from 'src/utility/types/data_types';
import BulkActions                                        from './BulkActions';
import { useCollapseContext }                             from '../../../contexts/CollapseToggle';
import CustomPagination                                   from '../../../components/Table/Pagination';
import { applyPagination,applyFilters }                   from '../../../utility/function/main';
import { filterStatusOptions }                            from '../../../utility/function/data';
import CustomTableRow                                     from './TableRow';



const ActivityDataTable: FC<RecentActivityTableInterface> = ({ activityData }) => {

  // it contains the ids of selected rows
  const [selectedActivityData, setSelectedActivityData] = useState<string[]>([]);
  // it let you know if any rows have been selected
  const selectedBulkActions = selectedActivityData.length > 0;
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
  const handleSelectAllActivityData = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedActivityData(event.target.checked? activityData.map(({id}) => id): []);
  };
  // it [add/remove] row ids to [selectedActivityData] variable when the user [select/deselect] row
  const handleSelectOneActivityData = (event: ChangeEvent<HTMLInputElement>,activityId: string): void => {
    if (!selectedActivityData.includes(activityId)) {
      setSelectedActivityData((prevSelected) => [...prevSelected,activityId]);
    } else {
      setSelectedActivityData((prevSelected) =>prevSelected.filter((id) => id !== activityId));
    }
  };
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {setPage(newPage);};
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredActivityData     = applyFilters<ActivityType,Filters>(activityData, filters,"activityLevel");
  const paginatedActivityData    = applyPagination<ActivityType>(filteredActivityData,page,limit);
  // it will be [true] if some but not all rows are selected
  const selectedSomeActivityData = selectedActivityData.length > 0 && selectedActivityData.length < activityData.length;
  // It will be [true] if all rows are selected
  const selectedAllActivityData  = selectedActivityData.length === activityData.length;

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
                <InputLabel>Status</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                  {filterStatusOptions.map(({id,name}) => (<MenuItem key={id} value={id}>{name}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      {/* The Table */}
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={selectedAllActivityData} indeterminate={selectedSomeActivityData} onChange={handleSelectAllActivityData}/>
              </TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Morning Feeling</TableCell>
              <TableCell align='center'>Activity State</TableCell>
              <TableCell align="center">Activity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* The content of the table */}
          <TableBody>
            {/* This function [paginatedActivityData] contains current rows after applying [filtering] and [pagination] */}
            {paginatedActivityData.map((row) => {
                return <CustomTableRow data={row} isActivityDataelected={selectedActivityData.includes(row.id)} handleSelectOneActivityData={handleSelectOneActivityData}/>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={filteredActivityData.length}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default ActivityDataTable;