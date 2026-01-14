import React,{useEffect } from 'react';

import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {StaticAutocomplete}       from '../../../components/Form';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters} from '../../../utility/customHook';
import {SelectableTable,TablePagination as CustomPagination} from '../../../components/Table';
import { columnsTask as columns } from '../../../utility/function/tableColumn';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import {TaskUniqueInterface}          from 'src/utility/types/data_types';

const TaskPageTable = React.memo(() => {

  console.log("TaskPageTable Render")



  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('task');


  const { table: tableData,setTable,pagination,setPagination,secondary,setSecondary } = usePaginationContext();

  const { data:secondary_data,success:secondary_success}: FetchData<TaskUniqueInterface> = useFetch <TaskUniqueInterface>('schedule/task/unique',{
    months:{},years:[], goal_status:[], goal_level:[]
  });


  useEffect(()=>{
    console.log("Hiiiiiiiiiiii")
    if(secondary_success){
      setSecondary(secondary_data)
      // const {years:task_years,months:task_months,status:task_status} = secondary_data;

    }
  },[secondary_data])

  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);




  const {filters,handleFilterChange,filterQuery} = useTableGlobalFilters("task");
  const taskMonthFilter=Object.entries(secondary?.task_months || {}).map(([key, value])=>[key,value]) as [string, string][]

  useEffect(() => {
    axiosGetData(`schedule/task/?${filterQuery}page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters]);
  return (
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
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <StaticAutocomplete
                    label="Task Year"
                    showValueInLabel={false}
                    defaultValue={ secondary.task_years!==undefined?
                      {
                        value:filters.year,
                        label: secondary.task_years.map((row)=>[row,row.toString()]).find((row) => row[0] === filters.year)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"
                      }:null
                    }
                    options={
                      secondary.task_years!==undefined?
                      [
                      ["all","ALL"],...secondary.task_years.map((row)=>[row,row.toString()])
                    ].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()})):[{value:"all",label:"ALL"}]
                  }
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
                    defaultValue={secondary.task_status!==undefined?
                      {value:filters.status,label: secondary.task_status.find((row) => row.toLowerCase() === filters.status)?.replace(/_/gi, " ").toUpperCase() || "ALL"}:null
                    }
                    options={secondary.task_status!==undefined?
                      [["all","ALL"],...secondary.task_status.map((row)=>[row.toLowerCase(),row])].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))
                      :[{value:"all",label:"ALL"}]

                    }
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
  );
});
export default TaskPageTable;