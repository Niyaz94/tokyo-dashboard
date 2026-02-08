import {useEffect, useMemo } from 'react';
import {Divider,Box,Card} from '@mui/material';
import CustomTableRow from './TableRow';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {
  useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters,useAPI2
} from '../../../utility/customHook';
import {SelectableTable,TablePagination as CustomPagination,FilterPanel,TableHeader} from '../../../components/Table';
import { columnsSingleTask as columns } from '../../../utility/function/tableColumn';
import {inputFields} from './config';
import {StatusCase2 } from '../../../utility/function/data';
import {SingleTaskSampleInterface}    from 'src/utility/types/data_types';


interface DataTableProps {
  // Define any props if needed
  results:SingleTaskSampleInterface[];
  count: number;
  next:number;
  previous:number;
}

const DataTable = () => {
  const { page, limit, fieldName,order,handlePageChange, handleLimitChange,handleFilterHeaderChange } = useTablePaginationHandlers('singleTask');
  const { table: tableData,setTable,pagination,setPagination,secondary,useTableData,setUseTableData } = usePaginationContext();
  

  // useTableData,       
  const {type:singleTaskType } = secondary;

  const singleTaskPriority=useMemo(()=>StatusCase2.map(({value,label})=>({value:value.toLowerCase(),label})),[StatusCase2]) 

  const {deleteTableRow}                              = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {filters,handleFilterChange,filterQuery}      = useTableGlobalFilters("singleTask");


  const {results,count,next,previous} = useAPI2<DataTableProps>({
    url:`schedule/stask/?${filterQuery}columnId=${fieldName}&orderBy=${order}&page=${page+1}&page_size=${limit}`,
    setUseTableData,
    useTableData,
    tableData
  });

  // It does not update the table data properly when we update the data after update or addition. The issue is with the cache of useAPI.
  // For example if I update the row then it bring back the old data because of the cache. I tried to update the cache with the new data but has some issues. I will try to fix it later.
  useEffect(() => {  

    if(useTableData){
      setTable(results); 
      setPagination({count: count, next: next, previous: previous});
    }
      
  }, [count,next,previous]);

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