import {useEffect } from 'react';
import {Divider,Box,Card,Typography,CardHeader,Button} from '@mui/material';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePaginationContext } from '../../../store/context/paginationContext';
import {axiosGetData} from '../../../utility/Axios'
import {
  useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters
} from '../../../utility/customHook';
import {SelectableTable,TablePagination as CustomPagination,FilterPanel} from '../../../components/Table';
import { columnsSingleTask as columns } from '../../../utility/function/tableColumn';
import {inputFields} from './config';
import {StatusCase2 } from '../../../utility/function/data';


const DataTable = () => {
  const { page, limit, fieldName,order,handlePageChange, handleLimitChange,handleFilterHeaderChange } = useTablePaginationHandlers('singleTask');
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const {type:singleTaskType } = secondary;
  const singleTaskPriority=StatusCase2.map(({value,label})=>({value:value.toLowerCase(),label}))
  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {filters,handleFilterChange,filterQuery} = useTableGlobalFilters("singleTask");
  const onTableHeaderClick = (columnId, order) => {
    handleFilterHeaderChange(columnId, order);
  }
  useEffect(() => {
    axiosGetData(`schedule/stask/?${filterQuery}columnId=${fieldName}&orderBy=${order}&page=${page+1}&page_size=${limit}`).then((res) => {
      const {results,count,next,previous} = res.data;
      setTable(results?results:[]);
      setPagination({count: count, next: next, previous: previous});
    });
  }, [ page, limit,filters,fieldName,order]);

  return (
    <>
      <FilterPanel
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterFields={inputFields({singleTaskPriority,singleTaskType}).filter(({fieldType},i)=>fieldType=="filter")}
      />
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
    </>
    
  );
};
export default DataTable;