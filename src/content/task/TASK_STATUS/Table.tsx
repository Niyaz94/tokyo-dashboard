import {useEffect } from 'react';
import {Divider,Box,Card,Typography,CardHeader,Button} from '@mui/material';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters} from '../../../utility/customHook';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {inputFields} from './config';
import {SelectableTable,TablePagination,TableHeaderButton,FilterPanel} from '../../../components/Table';

import {columnsTaskStatus as columns} from '../../../utility/function/tableColumn';

const DataTable = () => {
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();

  const { task_type,task_tags } = secondary;
  const navigate = useNavigate();
  const {deleteData,deleteTableMultiRow} = useDeleteAPI();

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('taskStatus');
  const {selectedIds,setSelectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
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
  const deleteSelectedRows = async () => {
    deleteTableMultiRow(selectedIds,"schedule/task_status/bulk_delete/",setTable)
    setSelectedIds([]);
  }

  return (
    <>
      <FilterPanel
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterFields={inputFields({
            task_type:task_type.filter(({status})=>status=="active"),
            task_tag:task_tags.map((name) => ({value: name, label: name.replace(/_/gi, " ").toUpperCase()}))
          }).filter(({fieldType},i)=>fieldType=="filter")}
      />
      <Card>
        {selectedIds.length>0 && (
          <Box flex={1} p={2}>
            <TableHeaderButton deletefun={deleteSelectedRows} ids={selectedIds} />
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
              <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 1,}}>
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
        <TablePagination
          count={pagination.count}
          page={page}
          rowsPerPage={limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
        />
      </Card>
    </>
    
  );
};
export default DataTable;