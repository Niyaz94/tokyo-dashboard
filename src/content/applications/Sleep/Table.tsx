import { FC, ChangeEvent, useState,JSX }      from 'react';
import {
  Tooltip,Divider,Box,FormControl,InputLabel,Card,
  Checkbox,IconButton,Table,TableBody,TableCell,
  TableHead,TablePagination,TableRow,TableContainer,
  Select,MenuItem,Typography,useTheme,CardHeader,Button ,Stack
                                        } from '@mui/material';
import Label                              from 'src/components/Label';
import { RecentSleepTableInterface,SleepType, level1Status }   from 'src/utility/types/data_types';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import TableCusCell                        from '../../../components/Table/Cell';
import BulkActions                        from './BulkActions';
import { useCollapseContext }             from '../../../contexts/CollapseToggle';

import { getStatusLabel,labelWithColor,labelColorByNumber,getTimeDifferenceInMinutes,getDayAbbreviation,applyPagination } from '../../../utility/function/main';


interface Filters {
  status?: level1Status; // it is an interface that accept three string values
}

// It filter the rows based on filter selection in the left top cornor of the table
const applyFilters = (data: SleepType[],filters: Filters): SleepType[] => {
  return data.filter((data) => {
    let matches = true;
    // FIXXXXXXXX
    if (filters.status && data.SleepState !== filters.status) {
      matches = false;
    }
    return matches;
  });
};

const SleepDataTable: FC<RecentSleepTableInterface> = ({ sleepData }) => {

  // it contains the ids of selected rows
  const [selectedSleepData, setSelectedSleepData] = useState<string[]>([]);
  // it let you know if any rows have been selected
  const selectedBulkActions = selectedSleepData.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const { open, toggleOpen } = useCollapseContext();

  // It uses for controlling filter selection in the left top cornor of the table
  const [filters, setFilters] = useState<Filters>({status: null});
  //The list of all options in filter selection in the left top cornor of the table
  const statusOptions = [
    {id: 'all',name: 'All'},
    {id: 'completed',name: 'Completed'},
    {id: 'pending',name: 'Pending'},
    {id: 'failed',name: 'Failed'}
  ];
  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({...prevFilters,status: value}));
  };
  // The checkbox inside the [table header] which either make all rows [selected/unselected]
  const handleSelectAllSleepData = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedSleepData(event.target.checked? sleepData.map(({id}) => id): []);
  };
  // it [add/remove] row ids to [selectedSleepData] variable when the user [select/deselect] row
  const handleSelectOneSleepData = (event: ChangeEvent<HTMLInputElement>,sleepId: string): void => {
    if (!selectedSleepData.includes(sleepId)) {
      setSelectedSleepData((prevSelected) => [...prevSelected,sleepId]);
    } else {
      setSelectedSleepData((prevSelected) =>prevSelected.filter((id) => id !== sleepId));
    }
  };
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {setPage(newPage);};
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredSleepData     = applyFilters(sleepData, filters);
  const paginatedSleepData    = applyPagination<SleepType>(filteredSleepData,page,limit);
  // it will be [true] if some but not all rows are selected
  const selectedSomeSleepData = selectedSleepData.length > 0 && selectedSleepData.length < sleepData.length;
  // It will be [true] if all rows are selected
  const selectedAllSleepData  = selectedSleepData.length === sleepData.length;
  const theme = useTheme();

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
              <Button variant="contained" color="primary" onClick={toggleOpen} sx={{
                fontSize: '1.2rem',
                padding: '10px 40px',
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: 3,
              }}>
                {open ? 'Close' : 'Insert'}
              </Button>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                  {statusOptions.map((statusOption) => (<MenuItem key={statusOption.id} value={statusOption.id}>{statusOption.name}</MenuItem>))}
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
                <Checkbox color="primary" checked={selectedAllSleepData} indeterminate={selectedSomeSleepData} onChange={handleSelectAllSleepData}/>
              </TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Morning Feeling</TableCell>
              <TableCell align='center'>Sleep State</TableCell>
              <TableCell align="center">Activity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* The content of the table */}
          <TableBody>
            {/* This function [paginatedSleepData] contains current rows after applying [filtering] and [pagination] */}
            {paginatedSleepData.map(({
              id,date,success,worrying,activity_level,morningFeeling,is_busy,bedTime,approxFellSleepTime,peeCountDuringNight,
              SleepState,approxWakingNum,morningWakingUp,dayTimeSleepInMinutes,burn_calories}) => {

              // it check if the row is selected or not
              const isSleepDataelected = selectedSleepData.includes(id);

              const sleepInHour=(getTimeDifferenceInMinutes(approxFellSleepTime.slice(0,5),morningWakingUp.slice(0,5))+dayTimeSleepInMinutes)/60
              const wastedTime=getTimeDifferenceInMinutes(bedTime.slice(0,5),approxFellSleepTime.slice(0,5))
              return (
                <TableRow hover  key={id}  selected={isSleepDataelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary" checked={isSleepDataelected} value={isSleepDataelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneSleepData(event, id)} 
                    />
                  </TableCell>
                  <TableCusCell prop={[{text:`${date} (${getDayAbbreviation(date)})`,styleType:1},{text:<Stack direction="row" spacing={1}>
                    <Label color={is_busy?'primary':'warning'} >{is_busy?'B':'N'}</Label>
                    <Label color={labelColorByNumber(success)} >SR: {success} %</Label>
                    </Stack>,styleType:2}]} 
                  />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:getStatusLabel(morningFeeling),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`F: ${bedTime.slice(0,5)}`,"primary")}
                        {labelWithColor(`FS: ${approxFellSleepTime.slice(0,5)}`,"success")}
                        {labelWithColor(`T: ${morningWakingUp.slice(0,5)}`,"black")}
                        {labelWithColor(`E: ${dayTimeSleepInMinutes}`,"info")}
                        </Stack>,styleType:2}
                    ]
                  } />
                  <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:getStatusLabel(SleepState),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {labelWithColor(`WT: ${wastedTime}`,labelColorByNumber(100-wastedTime/240*100))}
                        {labelWithColor(`ST: ${sleepInHour}`,labelColorByNumber(sleepInHour/10*100))}
                        {labelWithColor(`WN: ${approxWakingNum}`,"warning")}
                        {labelWithColor(`PN: ${peeCountDuringNight}`,"primary")}
                        </Stack>,styleType:2}
                    ]
                  } />
                   <TableCusCell cellProps={{align:"center"}} prop={
                    [
                      {text:labelWithColor(`BC: ${burn_calories} kcal`,labelColorByNumber(burn_calories/300*100)),styleType:1},
                      {text:<Stack direction="row"  sx={{justifyContent: "center",alignItems: "center"}} spacing={1}>
                        {getStatusLabel(worrying,"WL: ")}
                        {getStatusLabel(activity_level,"AL: ")}
                        </Stack>,styleType:2}
                    ]
                  } />
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton color="inherit" size="small" sx={{'&:hover': {background: theme.colors.primary.lighter},color: theme.palette.primary.main}} >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton color="inherit" size="small" sx={{'&:hover': { background: theme.colors.error.lighter },color: theme.palette.error.main}}  >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination 
          component="div" count={filteredSleepData.length} page={page} rowsPerPage={limit} rowsPerPageOptions={[5, 10, 25, 30]}
          onPageChange={handlePageChange} onRowsPerPageChange={handleLimitChange}
        />
      </Box>
    </Card>
  );
};
export default SleepDataTable;