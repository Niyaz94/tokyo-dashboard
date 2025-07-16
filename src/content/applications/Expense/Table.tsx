import { useCallback, ChangeEvent, useState, useEffect } from 'react';
import {
  Divider,Box,FormControl,InputLabel,Card,Checkbox,Table,TableBody,TableCell,TableHead,TableRow,
  TableContainer,Select,MenuItem,Typography,CardHeader,Button
} from '@mui/material';
import BulkActions from './BulkActions';
import CustomPagination from '../../../components/Table/Pagination';
import CustomTableRow from './TableRow';
import { useNavigate } from 'react-router-dom';
import useDeleteAPI from '../../../utility/customHook/useDeleteAPI';
import {axiosGetData} from '../../../utility/Axios'
import { usePaginationContext } from '../../../store/context/paginationContext';

import {CustomDatePicker,StaticAutocomplete}       from '../../../components/Form';


import { useSelector,useDispatch }    from 'react-redux';
import { RootState }                  from '../../../store/Reducer';
import {setPage,setLimit}             from '../../../store/slice/tablePagination';



const DataTable = () => {

  const { page, limit } = useSelector((state: RootState) => state.tablePagination.filter((item) => item.name === 'expense')[0]);
  const dispatch        = useDispatch();

  const { table: tableData,setTable,pagination,setPagination,secondary } = usePaginationContext();
  const { type:expense_types} = secondary;
  const navigate = useNavigate();
  const {response: deleteRowResponse,loading,error,deleteData} = useDeleteAPI();

  // it contains the ids of selected rows
  const [selectedTableData, setSelectedTableData] = useState<string[]>([]);
  // const [filters, setFilters] = useState<Filters>({ status: null });
  const [filters, setFilters] = useState<{expenseType:string,startDate:string,endDate:string}>({ 
    expenseType: "all" ,
    startDate: null,
    endDate: null
  });

  const selectedBulkActions = selectedTableData.length > 0;

  const handleSelectOneData = (event: ChangeEvent<HTMLInputElement>,id: string): void => {
    if (!selectedTableData.includes(id)) {
      setSelectedTableData((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedTableData((prevSelected) =>
        prevSelected.filter((singleId) => singleId !== id)
      );
    }
  };



  useEffect(() => {

      let extremParams = '';
      if (filters.startDate) {
        extremParams += `&startDate=${filters.startDate}`;
      }
      if (filters.endDate) {
        extremParams += `&endDate=${filters.endDate}`;
      }
      if (filters.expenseType && filters.expenseType !== 'all') {
        extremParams += `&expenseTypeId=${filters.expenseType}`;
      }
      axiosGetData(`notes/expense/?page=${page+1}&page_size=${limit}${extremParams}`).then((res) => {
        const {results,count,next,previous} = res.data;
        setTable(results);
        setPagination({count: count, next: next, previous: previous});
      });
    }, [ page, limit,filters]);

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

  const handleFormChange = useCallback((key, value) => {

    console.log(key, value);
    if ( ['expenseType'].includes(key) && value === null) {
      value = 'all'; 
    }
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  },[]);


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
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {
    dispatch(setPage({ name: 'expense', page: newPage }));
  };
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLimit({  name: 'expense', limit: parseInt(event.target.value) }));
  };

  const selectedSomePageData = selectedTableData.length > 0 && selectedTableData.length < tableData.length;
  const selectedAllPageData  = selectedTableData.length === tableData.length;

  const deleteTableRow = async (id) => {
    await deleteData(`notes/expense/${id}/`);
    setTable((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <Card>
      <Box p={2}>
        {/* <TableFilter /> */}
        {/* <TableFilter onFilterChange={(filters) => console.log(filters)} /> */}
      </Box>
      {/* When user select a row or more this panel will open */}
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
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
            <Box sx={{width: '100%',display: 'flex',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',gap: 2,}}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center'}}>

                
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="Start Date"
                    value={null}
                    placeholder=""
                    onChange={(newValue) => handleFormChange('startDate', newValue )}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                  <CustomDatePicker
                    pickerFullWidth={false}
                    label="End Date"
                    value={null}
                    placeholder=""
                    onChange={(newValue) => handleFormChange('endDate', newValue )}
                  />
                  
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 250}}>
                  <StaticAutocomplete
                    label="Status"
                    showValueInLabel={false}
                    defaultValue={{value:filters.expenseType,label: expense_types.find((row) => row[0] === filters.expenseType)?.[1].replace(/_/gi, " ").toUpperCase() || "ALL"}}
                    options={[["all","ALL"],...expense_types].map((row) => ({value: row[0], label: row[1].replace(/_/gi, " ").toUpperCase()}))}
                    formKey="expenseType"
                    onChange={handleFormChange}
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={selectedAllPageData} indeterminate={selectedSomePageData} onChange={handleSelectAllPageData}/>
              </TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Expense Type</TableCell>
              <TableCell align='center'>Amount</TableCell>
              <TableCell align="center">Note</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => {
              return (
                <CustomTableRow
                  data={row} isDataSelected={selectedTableData.includes(row.id)}
                  handleSelectOneData={handleSelectOneData} onDeleteRow={deleteTableRow}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
