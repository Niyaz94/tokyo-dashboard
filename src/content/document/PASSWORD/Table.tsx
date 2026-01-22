import {Divider,Box,Card} from '@mui/material';
import BulkActions from '../../../components/Table/TableHeaderMultiActions';
import CustomTableRow from './TableRow';
import { usePageContext } from '../../../store/context/pageContext';
import {DocumentSingleSampleInterface as SingleSampleInterface} from 'src/utility/types/data_types';
import {useDeleteAPI,useTablePaginationHandlers,useTableSelection,useTableFilters,useStaticTableFilters} from '../../../utility/customHook';
import {columnsDocument as columns} from '../../../utility/function/tableColumn';
import {SelectableTable,TablePagination as CustomPagination,TableHeader} from '../../../components/Table';



const DataTable = () => {

  const { page, limit, handlePageChange, handleLimitChange } = useTablePaginationHandlers('password');

  const { table: tableData,setTable } = usePageContext();

  const {selectedIds,setSelectedIds,handleSelectOne,handleSelectAll} = useTableSelection(tableData);
  const {deleteTableRow,deleteTableMultiRow} = useDeleteAPI();
  const {filters,handleFilterChange}    = useTableFilters({status: "all"});
  const { paginatedData, filteredData } = useStaticTableFilters<SingleSampleInterface>(tableData,filters,page,limit);

  const deleteSelectedRows = async () => {
    deleteTableMultiRow(selectedIds,"document/password/multi_delete/",setTable)
    setSelectedIds([]);
  }

  return (
    <Card>
      
      {selectedIds.length>0 && (
        <Box flex={1} p={3}>
          <BulkActions deletefun={deleteSelectedRows} />
        </Box>
      )}
      {selectedIds.length<1 && <TableHeader style={2}  url={"/documents/password_type"} title="Password" />}
      <Divider />
      <SelectableTable
        data={paginatedData} columns={columns} selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        renderRow={(row) => (
          <CustomTableRow
            key={row.id} data={row} isDataSelected={selectedIds.includes(row.id)}
            handleSelectOneData={handleSelectOne} onDeleteRow={async ()=>deleteTableRow(row.id,"document/password",setTable)}
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