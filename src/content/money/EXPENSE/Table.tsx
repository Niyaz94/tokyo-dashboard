import { useEffect } from 'react';
import {Divider,Box,Card,Typography,CardHeader,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


import CustomTableRow from './TableRow';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters} from '../../../utility/customHook';
import {axiosGetData} from '../../../utility/Axios'
import { usePaginationContext } from '../../../store/context/paginationContext';
import {SelectableTable,TablePagination as CustomPagination,FilterPanel} from '../../../components/Table';
import {columnsExpense as columns} from '../../../utility/function/tableColumn';


import CurrencyPanel from './currencyPanel';
import { expenseFormFields } from "./config";



const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('expense');
  const {filters,handleFilterChange,filterQuery} = useTableFilters({
    startDate: null,
    endDate: null,
    expenseId: "all",
    // expenseId: { value: "all" ,label:"ALL"},
    currencyId: "all",
    amount: { operator: "gt", value: 0 },
  });
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const { type:expense_types,currency_detail,currency:expense_currency} = secondary;

  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  useEffect(() => {
      axiosGetData(`money/expense/?${filterQuery}page=${page+1}&page_size=${limit}`).then((res) => {
        const {results,count,next,previous} = res.data;
        setTable(results);
        setPagination({count: count, next: next, previous: previous});
      });
  }, [ page, limit,filters]);


  return (
    <>
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'left', my: 1, backgroundColor: '#ffffff', padding: 2, borderRadius: 2}}>
      {currency_detail && <CurrencyPanel data={currency_detail} />}
    </Box>

    <Card>
      <FilterPanel
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterFields={expenseFormFields({expense_types,expense_currency}).filter(({fieldType},i)=>fieldType=="filter")}
      />
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>        </Box>
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
        renderRow={(row) => (
          <CustomTableRow
            key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"money/expense",setTable)}
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