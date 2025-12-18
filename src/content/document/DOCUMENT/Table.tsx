import {Divider,Box,FormControl,Card,Typography,CardHeader,Button} from '@mui/material';
import BulkActions from '../../../components/Table/TableHeaderMultiActions';
import CustomTableRow from './TableRow';
import { useNavigate,useLocation } from 'react-router-dom';
import { usePageContext } from '../../../store/context/pageContext';
import {DocumentSingleSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters,useStaticTableFilters} from '../../../utility/customHook';
import {columnsDocument as columns} from '../../../utility/function/tableColumn';
import {StaticAutocomplete}       from '../../../components/Form';
import { filterStatusOptions_2 } from '../../../utility/function/data';
import {SelectableTable,TablePagination as CustomPagination} from '../../../components/Table';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from '@mui/material/Tooltip';


const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('document');

  const { table: tableData,setTable } = usePageContext();

  const {selectedIds,setSelectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);

  const navigate = useNavigate();
  const location = useLocation();

  const {deleteTableRow,deleteTableMultiRow} = useDeleteAPI();
  const {filters,handleFilterChange}    = useTableFilters({status: "all"});
  const { paginatedData, filteredData } = useStaticTableFilters<SingleSampleInterface>(tableData,filters,page,limit);

  const deleteSelectedRows = async () => {
    deleteTableMultiRow(selectedIds,"document/document/multi_delete/",setTable)
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
            <Box width={600} height={70} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
              
              <Tooltip title="Add New Document Title" sx={{fontSize: '0.8rem'}} placement="top">
                <Button
                  variant="outlined" color="error" onClick={() => navigate('/documents/document_type/add',{state: { from: location.pathname } })}
                  sx={{padding: '10px',borderRadius: '20px 10px',textTransform: 'none',boxShadow: 3}}
                >
                  <AddTaskIcon fontSize="large" sx={{marginRight:1}} />
                </Button>
              </Tooltip>

              <Tooltip title="Add New Document" sx={{fontSize: '0.8rem'}} placement="top">
                <Button
                  variant="outlined" color="primary" onClick={() => navigate('add')}
                  sx={{padding: '10px',borderRadius: '20px 10px',textTransform: 'none',boxShadow: 3}}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </Tooltip>
              <FormControl fullWidth variant="outlined" sx={{paddingBottom:1,width:150}}>
                <StaticAutocomplete
                    label="Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.status,label: filterStatusOptions_2.find(({value,label}) => value === filters.status)?.label.replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[{value:"all",label:"ALL"},...filterStatusOptions_2]}
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
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"document/document",setTable)}
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