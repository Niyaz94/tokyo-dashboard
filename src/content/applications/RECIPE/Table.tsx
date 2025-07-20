import { ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import {applyPagination,applyFilters} from '../../../utility/function/main';
import { filterFoodRecipeDelicious } from '../../../utility/function/data';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePageContext } from '../../../store/context/pageContext';
import {TopicSingleSampleInterface as SingleSampleInterface,Filters} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters} from '../../../utility/customHook';




import {SelectableTable} from '../../../components/Table/SelectableTable';
import {CustomDatePicker,StaticAutocomplete}       from '../../../components/Form';
import {columnsRecipe as columns} from '../../../utility/function/tableColumn';


const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('recipe');
  

  const { table: tableData,setTable } = usePageContext();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();

  const [filters, setFilters] = useState<Filters>({ status: null });
  const [filteredPageData, setFilteredPageData] = useState<
    SingleSampleInterface[]
  >([]);

  useEffect(() => {
    setFilteredPageData(applyFilters<SingleSampleInterface, Filters>(tableData,filters,'delicious'));
  }, [tableData, filters]);

  useEffect(() => {
    const newPaginatedData = applyPagination<SingleSampleInterface>(filteredPageData,page,limit);
    // setPaginatedPageData(newPaginatedData);
  }, [filteredPageData, page, limit]);


  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };

  return (
    <Card>
      {selectedIds.length>0 && (
        <Box flex={1} p={2}>
          <BulkActions />
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
            <Box width={300} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined" color="primary" onClick={() => navigate('add')}
                sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}
              >
                Insert
              </Button>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                  {filterFoodRecipeDelicious.map(({ id, name }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))}
                </Select>
              </FormControl>
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
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"notes/recipe",setTable)}
          />
        )}
      />
      <CustomPagination
        count={filteredPageData.length}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default DataTable;