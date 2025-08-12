import {useEffect } from 'react';
import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters,useTableGlobalFilters} from '../../../utility/customHook';
import { usePaginationContext } from '../../../store/context/paginationContext';

import {axiosGetData} from '../../../utility/Axios'

import {CustomDatePicker,StaticAutocomplete}       from '../../../components/Form';
import {SelectableTable} from '../../../components/Table/SelectableTable';
import {columnsTaskStatus as columns} from '../../../utility/function/tableColumn';
import { f } from 'react-router/dist/development/fog-of-war-Ckdfl79L';

const DataTable = () => {
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();

  const { _, task_status,task_tags } = secondary;
  const navigate = useNavigate();
  const {deleteData} = useDeleteAPI();

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('taskStatus');
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {filters,handleFilterChange,filterQuery} = useTableGlobalFilters("taskStatus");

  useEffect(() => {    
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
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>
          {/* <BulkActions /> */}
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
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center'}}>    
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="Start Date"
                    value={filters.start_date.toString() || null}
                    placeholder=""
                    onChange={(newValue) => handleFilterChange('start_date', newValue )}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="End Date"
                    value={filters.end_date.toString() || null}
                    placeholder=""
                    onChange={(newValue) => handleFilterChange('end_date', newValue )}
                  />
                  
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 250}}>
                  <StaticAutocomplete
                    label="Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.status,label: filters.status.toString().toUpperCase()}}
                    options={["all",...task_status].map((name) => ({value: name, label: name.replace(/_/gi, " ").toUpperCase()}))}
                    formKey="status"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <StaticAutocomplete
                    label="Tags"
                    showValueInLabel={false}
                    defaultValue={{value:filters.tag,label: filters.tag.toString().toUpperCase()}}
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
      <SelectableTable
        data={tableData} columns={columns} selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        renderRow={(row) => (
          <CustomTableRow
            key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
            handleSelectOneData={handleSelectOne} onDeleteRow={deleteTableRow}
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