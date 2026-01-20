import React,{useEffect,useMemo } from 'react';

import {Divider,Box,Card,Typography,CardHeader,Button} from '@mui/material';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters} from '../../../utility/customHook';
import {SelectableTable,TablePagination as CustomPagination,FilterPanel} from '../../../components/Table';
import { columnsTask as columns } from '../../../utility/function/tableColumn';
import {inputFields}              from './config';


const TaskPageTable = React.memo(() => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('task');
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {years:task_years,months:task_months} = secondary;
  
  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {filters,handleFilterChange,filterQuery} = useTableGlobalFilters("task");


  useEffect(() => {
    axiosGetData(`schedule/task/?${filterQuery}page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters]);

  const memoFilterPanel=useMemo(()=>{
    return (<FilterPanel
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterFields={inputFields({task_years,task_months}).filter(({fieldType},i)=>fieldType=="filter")}
      />)
  },[])

  return (
    <Box>
      {memoFilterPanel}
      <Card>
        {selectedIds.length<1 && (
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6">Recent Orders</Typography>
              </Box>
            }
            action={
              <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 2,}}>
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
        {tableData.length>0 && (<SelectableTable
          data={tableData} columns={columns} selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          renderRow={(row) => (
            <CustomTableRow
              key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
              handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"schedule/task",setTable)}
            />
          )}
        />)}
        <CustomPagination
          count={pagination.count}
          page={page}
          rowsPerPage={limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
        />
      </Card>
    </Box>
    
  );
});
export default TaskPageTable;