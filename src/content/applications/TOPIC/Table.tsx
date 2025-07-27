import { ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import {applyPagination,applyFilters,applyFilterValue} from '../../../utility/function/main';
import { filterTopicStatusOptions } from '../../../utility/function/data';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import useDeleteAPI from '../../../utility/customHook/useDeleteAPI';
import { usePageContext } from '../../../store/context/pageContext';
import {TopicSingleSampleInterface as SingleSampleInterface,Filters} from 'src/utility/types/data_types';

import { useSelector,useDispatch }    from 'react-redux';
import { RootState }                  from '../../../store/Reducer';
import {setPage,setLimit}             from '../../../store/slice/tablePagination';


const DataTable = () => {

  const { page, limit } = useSelector((state: RootState) => state.tablePagination.filter((item) => item.name === 'topic')[0]);
  const dispatch        = useDispatch();

  const { table: tableData,setTable } = usePageContext();
  const navigate = useNavigate();
  const {response: deleteRowResponse,loading,error,deleteData} = useDeleteAPI();

  // it contains the ids of selected rows
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  // it let you know if any rows have been selected
  const [filters, setFilters] = useState<Filters>({ status: null });
  const [filteredPageData, setFilteredPageData] = useState<
    SingleSampleInterface[]
  >([]);
  const [paginatedPageData, setPaginatedPageData] = useState<
    SingleSampleInterface[]
  >([]);

  const selectedBulkActions = selectedTableData.length > 0;

  const handleSelectOneData = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedTableData.includes(id)) {
      setSelectedTableData((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedTableData((prevSelected) =>
        prevSelected.filter((singleId) => singleId !== id)
      );
    }
  };

  useEffect(() => {
    setFilteredPageData(
      //???
      applyFilters<SingleSampleInterface, Filters>(tableData,filters,'status')
    );
  }, [tableData, filters]);

  useEffect(() => {
    const newPaginatedData = applyPagination<SingleSampleInterface>(filteredPageData,page,limit);
    setPaginatedPageData(newPaginatedData);
  }, [filteredPageData, page, limit]);


  // It uses for controlling filter selection in the left top cornor of the table
  //The list of all options in filter selection in the left top cornor of the table

  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({ ...prevFilters, status: value }));
  };
  // The checkbox inside the [table header] which either make all rows [selected/unselected]
  const handleSelectAllPageData = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTableData(
      event.target.checked ? tableData.map(({ id }) => id) : []
    );
  };
  // it [add/remove] row ids to [selectedTableData] variable when the user [select/deselect] row
  const handleSelectOnePageData = (event: ChangeEvent<HTMLInputElement>,pageId: string): void => {
    if (!selectedTableData.includes(pageId)) {
      setSelectedTableData((prevSelected) => [...prevSelected, pageId]);
    } else {
      setSelectedTableData((prevSelected) =>
        prevSelected.filter((id) => id !== pageId)
      );
    }
  };
  const handlePageChange = (event: any, newPage: number): void => {
    dispatch(setPage({ name: 'topic', page: newPage }));
  };
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLimit({  name: 'topic', limit: parseInt(event.target.value) }));
  };

  const selectedSomePageData = selectedTableData.length > 0 && selectedTableData.length < tableData.length;
  const selectedAllPageData  = selectedTableData.length === tableData.length;

  const deleteTableRow = async (id) => {
    await deleteData(`notes/topic/${id}/`);
    setTable((prev) => prev.filter((row) => row.id !== id));
  };

  const deleteSelectedRows = async () => {
    console.log(selectedTableData)
  }
  

  return (
    <Card>
      <Box p={2}>
        {/* <TableFilter /> */}
        {/* <TableFilter onFilterChange={(filters) => console.log(filters)} /> */}
      </Box>
      {/* When user select a row or more this panel will open */}
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions deletefun={deleteSelectedRows} />
        </Box>
      )}
      {/* When user does not select any rows this panel will open (default one) */}
      {!selectedBulkActions && (
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
                  {filterTopicStatusOptions.map(({ id, name }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={selectedAllPageData} indeterminate={selectedSomePageData} onChange={handleSelectAllPageData}/>
              </TableCell>
              <TableCell align='left'>Date</TableCell>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align="center">Last Update</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPageData.map((row) => {
              return (
                <CustomTableRow key={row.id}
                  data={row} isDataSelected={selectedTableData.includes(row.id)}
                  handleSelectOneData={handleSelectOneData} onDeleteRow={deleteTableRow}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
