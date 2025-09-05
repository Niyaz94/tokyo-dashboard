import {
  Divider,Box,FormControl,Card,Typography,CardHeader,Button
} from '@mui/material';
import { FoodRecipeDelicious } from '../../../utility/function/data';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePageContext } from '../../../store/context/pageContext';
import {RecipeSingleSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters,useStaticTableFilters} from '../../../utility/customHook';

import {SelectableTable,TablePagination as CustomPagination,TableHeaderButton} from '../../../components/Table';
import {StaticAutocomplete}       from '../../../components/Form';
import {columnsRecipe as columns} from '../../../utility/function/tableColumn';

const DataTable = () => {
  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('recipe');
  const { table: tableData,setTable } = usePageContext();
  const {selectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const navigate = useNavigate();
  const {deleteTableRow} = useDeleteAPI();
  const {filters,handleFilterChange}    = useTableFilters({delicious: "all"});
  const { paginatedData, filteredData } = useStaticTableFilters<SingleSampleInterface>(tableData,filters,page,limit);
  
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
            <Box width={300} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined" color="primary" onClick={() => navigate('add')}
                sx={{fontSize: '1.2rem',padding: '10px 40px',borderRadius: '10px',textTransform: 'none',boxShadow: 3}}
              >
                Insert
              </Button>
              <FormControl fullWidth variant="outlined">
                <StaticAutocomplete
                    label="Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.delicious,label: FoodRecipeDelicious.find((row) => row === filters.delicious)?.replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...FoodRecipeDelicious.map((row)=>[row,row])].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="delicious"
                    onChange={handleFilterChange}
                />
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />

      <SelectableTable
        data={paginatedData} columns={columns} selectedIds={selectedIds}
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
        count={filteredData.length}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};
export default DataTable;