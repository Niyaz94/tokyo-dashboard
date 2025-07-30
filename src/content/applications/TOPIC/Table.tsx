import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import BulkActions from '../../../components/Table/TableHeaderMultiActions';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import { usePageContext } from '../../../store/context/pageContext';
import {TopicSingleSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters,useStaticTableFilters} from '../../../utility/customHook';
import {columnsTopic as columns} from '../../../utility/function/tableColumn';
import {SelectableTable}          from '../../../components/Table/SelectableTable';
import {StaticAutocomplete}       from '../../../components/Form';
import { filterTopicStatusOptions } from '../../../utility/function/data';



const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('recipe');

  const { table: tableData,setTable } = usePageContext();

  const {selectedIds,setSelectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  const navigate = useNavigate();
  const {deleteTableRow,deleteTableMultiRow} = useDeleteAPI();
  const {filters,handleFilterChange}    = useTableFilters({status: "all"});
  const { paginatedData, filteredData } = useStaticTableFilters<SingleSampleInterface>(tableData,filters,page,limit);

  const deleteSelectedRows = async () => {
    deleteTableMultiRow(selectedIds,"notes/topic/multi_delete/",setTable)
    setSelectedIds([]);
  }

  return (
    <Card>
      
      {selectedIds.length>0 && (
        <Box flex={1} p={3}>
          <BulkActions deletefun={deleteSelectedRows} />
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
                    defaultValue={{value:filters.status,label: filterTopicStatusOptions.find((row) => row.id === filters.status)?.name.replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={filterTopicStatusOptions.map((row) => ({value: row.id, label: row.name.toUpperCase()}))}
                    formKey="status"
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
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"notes/topic",setTable)}
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