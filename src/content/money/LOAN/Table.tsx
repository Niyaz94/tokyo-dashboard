import { useEffect } from 'react';
import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTableRow from './TableRow';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters,useAPI} from '../../../utility/customHook';
import { usePaginationContext } from '../../../store/context/paginationContext';

import {SelectableTable,TablePagination as CustomPagination} from '../../../components/Table';

import {CustomDatePicker,StaticAutocomplete}        from '../../../components/Form';
import {columnsLoan as columns}                     from '../../../utility/function/tableColumn';

const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('loan');
  const {filters,handleFilterChange,filterQuery} = useTableFilters({startDate: null ,endDate: null,typeId: "all"});
  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const { type:loanTypes} = secondary;
  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);


  const {results,count,next,previous} = useAPI<any>(`money/loan/?${filterQuery}page=${page+1}&page_size=${limit}`);
  useEffect(() => {    
    setTable(results);
    setPagination({count: count, next: next, previous: previous});
  }, [count,next,previous]);
  
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
                    value={null}
                    placeholder=""
                    onChange={(newValue) => handleFilterChange('startDate', newValue )}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="End Date"
                    value={null}
                    placeholder=""
                    onChange={(newValue) => handleFilterChange('endDate', newValue )}
                  />
                  
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 250}}>
                  <StaticAutocomplete
                    label="Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.typeId,label: loanTypes.find(({value,label}) => value === filters.typeId)?.label.replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={
                      [{"value":"all","label":"ALL"},...loanTypes].map(({value,label}) => ({value: value, label: label.replace(/_/gi, " ").toUpperCase()}))
                    }
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
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"money/loan",setTable)}
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