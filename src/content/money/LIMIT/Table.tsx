import { useEffect } from 'react';
import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


// import BulkActions from './BulkActions';
import CustomTableRow from './TableRow';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters} from '../../../utility/customHook';
import {axiosGetData} from '../../../utility/Axios'
import { usePaginationContext } from '../../../store/context/paginationContext';

import {SelectableTable,TablePagination as CustomPagination,TableHeaderButton} from '../../../components/Table';

import {CustomDatePicker,StaticAutocomplete}       from '../../../components/Form';
import {columnsLimit as columns} from '../../../utility/function/tableColumn';

const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('limit');
  const {filters,handleFilterChange,filterQuery} = useTableFilters({
    year: "all" ,
    month: "all",
    currencyId: "all",
    typeId: "all",
    
  });
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const { type:unique_types,currency:unique_currencies,years:unique_years,months:unique_months} = secondary;
  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  useEffect(() => {
      axiosGetData(`money/limit/?${filterQuery}page=${page+1}&page_size=${limit}`).then((res) => {
        const {results,count,next,previous} = res.data;
        setTable(results);
        setPagination({count: count, next: next, previous: previous});
      });
  }, [ page, limit,filters]);

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
                
                <FormControl variant="outlined" sx={{ minWidth: 200}}>
                  <StaticAutocomplete
                    label="Year"
                    showValueInLabel={false}
                    defaultValue={{value:filters.year,label: unique_years.find((row) => row === filters.year)?.toString() || "ALL"}}
                    options={[0,...unique_years].map((row) => ({value: row, label: row==0?"ALL":row.toString()}))}
                    formKey="year"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200}}>
                  <StaticAutocomplete
                    label="Month"
                    showValueInLabel={false}
                    defaultValue={{value:filters.month,label: unique_months.find((row) => row[0] === filters.month)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...unique_months].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="month"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200}}>
                  <StaticAutocomplete
                    label="Currency"
                    showValueInLabel={false}
                    defaultValue={{value:filters.currencyId,label: unique_currencies.find((row) => row[0] === filters.currencyId)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...unique_currencies].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="currencyId"
                    onChange={handleFilterChange}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200}}>
                  <StaticAutocomplete
                    label="Type"
                    showValueInLabel={false}
                    defaultValue={{value:filters.typeId,label: unique_types.find((row) => row[0] === filters.typeId)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...unique_types].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="typeId"
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
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"money/limit",setTable)}
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