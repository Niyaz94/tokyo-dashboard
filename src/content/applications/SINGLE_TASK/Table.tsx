import {useEffect,useState } from 'react';
import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {StaticAutocomplete}       from '../../../components/Form';
import {
  useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters
} from '../../../utility/customHook';
import {SelectableTable} from '../../../components/Table/SelectableTable';
import { columnsSingleTask as columns } from '../../../utility/function/tableColumn';


const DataTable = () => {
  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('singleTask');

  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {status:single_task_status,priority:single_task_priority,type:single_task_type } = secondary;
  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {filters,handleFilterChange,filterQuery} = useTableGlobalFilters("singleTask");

  const [orderColumn, setOrderColumn] = useState<string>('');

  const onTableHeaderClick = (columnId, order) => {
    setOrderColumn(`columnId=${columnId}&orderBy=${order}&`);
  }

  useEffect(() => {
    axiosGetData(`schedule/stask/?${filterQuery}${orderColumn}page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters,orderColumn]);

  return (
    <Card>
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>
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
                    label="Type"
                    showValueInLabel={false}
                    defaultValue={{value:filters.type,label: single_task_type.map((row)=>[row[1],row[1].toString()]).find((row) => row[0] === filters.type)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...single_task_type.map((row)=>[row[1],row[1].toString()])].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="type"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200,maxWidth: 400 }}>
                  <StaticAutocomplete
                    label="Status"
                    multiple={true}
                    showValueInLabel={false}
                    
                    defaultValue={ 
                      (Array.isArray(filters.status) && filters.status.length > 0) &&
                      filters.status.map((row: string) => ({
                        value: row,
                        label:
                          single_task_status.find((item: string) => item === row)?.toString().replace(/_/gi, " ").toUpperCase() || "ALL"
                      })) || [{value: "all", label: "ALL"}]
                    }
                    options={
                      ["all",...single_task_status].map(row => ({value: row, label: row.replace(/_/gi, " ").toUpperCase()}))}
                    formKey="status"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <StaticAutocomplete
                    label="Priority"
                    showValueInLabel={false}
                    defaultValue={{value:filters.priority,label: single_task_priority.map((row)=>[row,row.toString()]).find((row) => row[0] === filters.priority)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={["all",...single_task_priority].map(row => ({value: row, label: row.replace(/_/gi, " ").toUpperCase()}))}
                    formKey="priority"
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
        onTableHeaderClick={onTableHeaderClick}
        renderRow={(row) => (
          <CustomTableRow
            key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"schedule/stask",setTable)}
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