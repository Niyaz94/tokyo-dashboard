import {useEffect } from 'react';
import {
  Divider,Box,FormControl,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteAPI,useTablePaginationHandlers,
  useTableSelection,useTableFilters
} from '../../../utility/customHook';
import { usePaginationContext } from '../../../store/context/paginationContext';

import {axiosGetData} from '../../../utility/Axios'

import {CustomDatePicker,StaticAutocomplete}       from '../../../components/Form';


const DataTable = () => {
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();

  const { _, task_status,task_tags } = secondary;
  const navigate = useNavigate();
  const {deleteData} = useDeleteAPI();

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('taskStatus');
  const {selectedIds,handleSelectOne,handleSelectAll,someSelected,allSelected} = useTableSelection(tableData);

  const {filters,handleFilterChange,filterQuery} = useTableFilters({
    start_date: null ,
    end_date: null,
    status: "all",
    tag: "all"
  });

  useEffect(() => {
    // console.log("filters",filterQuery);
    
    axiosGetData(`schedule/task_status/plist/?${filterQuery}page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results);
      setPagination({count: count, next: next, previous: previous});
    });

  }, [ page, limit,filters]);

  const deleteTableRow = async (id) => {
    await deleteData(`schedule/task_status/${id}/`);
    setTable((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <Card>
      {/* When user select a row or more this panel will open */}
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {/* When user does not select any rows this panel will open (default one) */}
      {selectedIds.length<1 && (
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">Recent Orders</Typography>
            </Box>
          }
          action={
            <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 2,}}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center'}}>

                
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="Start Date"
                    value={null}
                    placeholder=""
                    onChange={(newValue) => handleFilterChange('start_date', newValue )}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="End Date"
                    value={null}
                    placeholder=""
                    onChange={(newValue) => handleFilterChange('end_date', newValue )}
                  />
                  
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 250}}>
                  <StaticAutocomplete
                    label="Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.status,label: filters.status.toUpperCase()}}
                    options={["all",...task_status].map((name) => ({value: name, label: name.replace(/_/gi, " ").toUpperCase()}))}
                    formKey="status"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <StaticAutocomplete
                    label="Tags"
                    showValueInLabel={false}
                    defaultValue={{value:filters.tag,label: filters.tag.toUpperCase()}}
                    options={["all",...task_tags].map((name) => ({value: name, label: name.replace(/_/gi, " ").toUpperCase()}))}
                    formKey="tag"
                    onChange={handleFilterChange}
                  />
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
                <Checkbox color="primary" checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll}/>
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
            {tableData.map((row) => {
              return (
                <CustomTableRow
                  data={row} isDataSelected={selectedIds.includes(row.id)}
                  handleSelectOneData={handleSelectOne} onDeleteRow={deleteTableRow}
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
