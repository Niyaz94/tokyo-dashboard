import { useEffect } from 'react';
import {Divider,Box,Card,Typography,CardHeader,Button} from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';

import CustomTableRow from './TableRow';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableGlobalFilters} from '../../../utility/customHook';
import {axiosGetData} from '../../../utility/Axios'
import { usePaginationContext } from '../../../store/context/paginationContext';
import {SelectableTable,TablePagination as CustomPagination,FilterPanel} from '../../../components/Table';
import {columnsExpense as columns} from '../../../utility/function/tableColumn';

import { useSelector}          from 'react-redux'
import { RootState }                from '../../../store/Reducer';
import CurrencyPanel from './currencyPanel';
import { expenseFormFields } from "./config";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween);

const DataTable = () => {

  
  const location = useLocation();

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('expense');
  const {filters,handleFilterChange,filterQuery} = useTableGlobalFilters("expense");
  
  const { table: tableData,setTable,pagination,setPagination,secondary,setSecondary } = usePaginationContext();
  const { type:expense_category,currency_detail,currency:expense_currency} = secondary;

  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);  

  const loginDetail = useSelector((state: RootState) =>state.auth);


  const removeFromCurrencyTotalSpend = (id) => {
    const expenseItem = tableData.find(item => item.id === id);
    if (!expenseItem) return;

    const { amount, currency_name, date, consider } = expenseItem;

    if (consider) {
      setSecondary((prev)=>({
        ...prev,
        currency_detail: prev.currency_detail.map((item)=>{
          if(item.name === currency_name && dayjs(date).isBetween(item.start_date, item.end_date,null,'[]')){
            return {...item, totalspend: item.totalspend- Number(amount)};
          }
          return item;
        })
      }));
    }
  }
  useEffect(() => {
      if (location?.state?.page_name === 'expense_added') {
        navigate(".", {replace: true,state: { page_name: "expense_list" }});
        return ;
      }
      axiosGetData(`money/expense/?${filterQuery}page=${page+1}&page_size=${limit}`,loginDetail.token).then((res) => {
        const {results,count,next,previous} = res.data;
        setTable(results);
        setPagination({count: count, next: next, previous: previous});
      });
  }, [ page, limit,filterQuery]);

  return (
    <>
      <FilterPanel
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterFields={expenseFormFields({expense_category,expense_currency}).filter(({fieldType},i)=>fieldType=="filter")}
      />
      <Card>
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
              handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>{
                deleteTableRow(row.id,"money/expense",setTable);
                removeFromCurrencyTotalSpend(row.id);}}
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
      {currency_detail && <CurrencyPanel data={currency_detail} />}
    </>
    
  );
};
export default DataTable;