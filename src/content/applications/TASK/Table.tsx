import {useEffect } from 'react';
import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {StaticAutocomplete}       from '../../../components/Form';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters} from '../../../utility/customHook';
import {SelectableTable} from '../../../components/Table/SelectableTable';
import { columnsTask as columns } from '../../../utility/function/tableColumn';


const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('expense');
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {
    goal_status,goal_level,years:task_years,months:task_months,status:task_status
  } = secondary;

  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  const {filters,handleFilterChange,filterQuery} = useTableFilters({status: "ALL" ,year: "ALL",month: "ALL"});
  const taskMonthFilter=Object.entries(task_months).map(([key, value])=>[key,value]) as [string, string][]

  useEffect(() => {
    axiosGetData(`schedule/task/?${filterQuery}page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters]);
  return (
    <Card>
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>
          <BulkActions />
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
            <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 2,}}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <StaticAutocomplete
                    label="Task Year"
                    showValueInLabel={false}
                    defaultValue={{value:filters.year,label: task_years.map((row)=>[row,row.toString()]).find((row) => row[0] === filters.year)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...task_years.map((row)=>[row,row.toString()])].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="year"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <StaticAutocomplete
                    label="Task Month"
                    showValueInLabel={false}
                    defaultValue={{value:filters.month,label: taskMonthFilter.find((row) => row[0] === filters.month)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...taskMonthFilter].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="month"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  {/* The filtering is different from other, remember that if you created template for that */}
                  <StaticAutocomplete
                    label="Task Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.status,label: task_status.find((row) => row.toLowerCase() === filters.status)?.replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...task_status.map((row)=>[row.toLowerCase(),row])].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="status"
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
      <SelectableTable
        data={tableData} columns={columns} selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        renderRow={(row) => (
          <CustomTableRow
            key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"schedule/task",setTable)}
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