import { FC, ChangeEvent, useState,useEffect }      from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,TableContainer,
  Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions                                        from './BulkActions';
import CustomPagination                                   from '../../../components/Table/Pagination';
import { applyPagination,applyFilters,applyFilterValue ,createMapLabelData}  from '../../../utility/function/main';
import { filterStatusOptions }                            from '../../../utility/function/data';
import CustomTableRow                                     from './TableRow';
import { useNavigate }                                    from "react-router-dom";

import useDeleteAPI                                       from '../../../utility/customHook/useDeleteAPI';
import { 
  TaskStatusSingleSampleInterface as SingleSampleInterface,TaskStatusRecordInterface as RecordInterface, Filters 
}   from 'src/utility/types/data_types';




const SleepDataTable: FC<RecordInterface> = ({data:tableData,unique}) => {

  // const  {addEditData}  = useAddEdit();
  // console.log(addEditData)
  

  const {tasks_name,task_status} = unique
  const valueMap ={
    taskNameMap:createMapLabelData(tasks_name.map((row)=>row[0])),
    taskStatusMap:createMapLabelData(task_status,[3,0,2,4]),
    taskMap:createMapLabelData(["active","inactive","archive"],[3,2,4]),

  }

  const navigate = useNavigate();
  const { response:deleteRowResponse, loading, error, deleteData } = useDeleteAPI();


  // it contains the ids of selected rows
  const [selectedSleepData, setSelectedSleepData]     = useState<string[]>([]);
  // it let you know if any rows have been selected
  const [page, setPage]                               = useState<number>(0);
  const [limit, setLimit]                             = useState<number>(5);
  const [filters, setFilters]                         = useState<Filters>({status: null});
  const [filteredSleepData,setFilteredSleepData]      = useState<SingleSampleInterface[]>([]);
  const [paginatedSleepData,setPaginatedSleepData]    = useState<SingleSampleInterface[]>([]);
  const [deletedRowId,setDeletedRowId]    = useState(0);


  const selectedBulkActions = selectedSleepData.length > 0;


  const handleSelectOneData = (event: ChangeEvent<HTMLInputElement>,id: string): void => {
    if (!selectedSleepData.includes(id)) {
      setSelectedSleepData((prevSelected) => [...prevSelected,id]);
    } else {
      setSelectedSleepData((prevSelected) =>prevSelected.filter((singleId) => singleId !== id));
    }
  };

  useEffect(() => {
    setFilteredSleepData(applyFilters<SingleSampleInterface,Filters>(tableData, filters,"task_name"));
  }, [tableData,filters]);

  useEffect(() => {
    const newPaginatedData = applyPagination<SingleSampleInterface>(filteredSleepData, page, limit);
    setPaginatedSleepData(newPaginatedData);
  }, [filteredSleepData, page, limit]); 

  useEffect(() => {
    const {data,success} = deleteRowResponse || {data:null,success:false};
    if(success){
      setFilteredSleepData(applyFilterValue<SingleSampleInterface>(filteredSleepData,"id",deletedRowId))
      setDeletedRowId(0);
    }
  }
  , [deleteRowResponse]);
  // It uses for controlling filter selection in the left top cornor of the table
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
  const handleSelectAllSleepData = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedSleepData(event.target.checked? tableData.map(({id}) => id): []);
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


  // it will be [true] if some but not all rows are selected
  const selectedSomeSleepData = selectedSleepData.length > 0 && selectedSleepData.length < tableData.length;
  // It will be [true] if all rows are selected
  const selectedAllSleepData  = selectedSleepData.length === tableData.length;

  const deleteTableRow=async (id)=>{
    // await deleteData(`notes/sleep/${id}/`);
    setDeletedRowId(id);
  }

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
                variant="outlined" color="primary" onClick={() => navigate("add")} 
                sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}>
                Insert
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
            {paginatedSleepData.map((row) => {
                return <CustomTableRow 
                  data={row} {...valueMap} 
                  isDataSelected={selectedSleepData.includes(row.id)} 
                  handleSelectOneData={handleSelectOneData}
                  onDeleteRow={deleteTableRow}
                />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={filteredSleepData.length}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default SleepDataTable;