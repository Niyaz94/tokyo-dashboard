import {Divider,Box,Card,Typography,CardHeader,Button} from '@mui/material';
import BulkActions from '../../../components/Table/TableHeaderMultiActions';
import CustomTableRow from './TableRow';
import { useNavigate,useLocation } from 'react-router-dom';
import { usePageContext } from '../../../store/context/pageContext';
import {PageTypeSingleSampleInterface} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useStaticTableFilters} from '../../../utility/customHook';
import {columnsPageType as columns} from '../../../utility/function/tableColumn';
import {SelectableTable,TablePagination as CustomPagination} from '../../../components/Table';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';


const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('topicType');
  const { table: tableData,setTable } = usePageContext();
  const {selectedIds,setSelectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const navigate = useNavigate();
  const location = useLocation();

  const {deleteTableRow,deleteTableMultiRow} = useDeleteAPI();
  const { paginatedData, filteredData } = useStaticTableFilters<PageTypeSingleSampleInterface>(tableData,{},page,limit);

  const deleteSelectedRows = async () => {
    deleteTableMultiRow(selectedIds,"notes/topic_type/multi_delete/",setTable)
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
              <Tooltip title="Add New Topic Type" sx={{fontSize: '0.8rem'}} placement="top">
                <Button
                  variant="outlined" color="primary" onClick={() => navigate('add',{state: { from: location.pathname } })}
                  sx={{padding: '10px',borderRadius: '20px 10px',textTransform: 'none',boxShadow: 3}}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </Tooltip>
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
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"notes/topic_type",setTable)}
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