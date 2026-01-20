import {useEffect, useMemo } from 'react';
import {Divider,Box,Card} from '@mui/material';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {
  useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters
} from '../../../utility/customHook';
import {SelectableTable,TablePagination as CustomPagination,FilterPanel,TableHeader} from '../../../components/Table';
import { columnsSingleTask as columns } from '../../../utility/function/tableColumn';
import {inputFields} from './config';
import {StatusCase2 } from '../../../utility/function/data';


const DataTable = () => {
  console.log("Single Task DataTable")
  const { page, limit, fieldName,order,handlePageChange, handleLimitChange,handleFilterHeaderChange } = useTablePaginationHandlers('singleTask');
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  
  const {type:singleTaskType } = secondary;

  const singleTaskPriority=useMemo(()=>StatusCase2.map(({value,label})=>({value:value.toLowerCase(),label})),[StatusCase2]) 

  const {deleteTableRow}                              = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {filters,handleFilterChange,filterQuery}      = useTableGlobalFilters("singleTask");
  
  // const onTableHeaderClick = 

  useEffect(() => {
    axiosGetData(`schedule/stask/?${filterQuery}columnId=${fieldName}&orderBy=${order}&page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results?results:[]);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters,fieldName,order]);

  const memoFilterPanel=useMemo(()=>{
    return (<FilterPanel
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterFields={inputFields({singleTaskPriority,singleTaskType}).filter(({fieldType},i)=>fieldType=="filter")}
      />)
  },[])

  return (
    <Box>
      {memoFilterPanel}
      <Card>
        {selectedIds.length<1 && <TableHeader />}
        <Divider />
        {/* __CHECK__ :- It cause one render */}
        {tableData.length>0 && <SelectableTable
          data={tableData} columns={columns} selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onTableHeaderClick={(columnId, order:'asc' | 'desc') => {
              handleFilterHeaderChange(columnId, order);
          }} 
          renderRow={(row) => (
            <CustomTableRow
              key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
              handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"schedule/stask",setTable)}
            />
          )}
        />}
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
};
export default DataTable;