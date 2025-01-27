import { FC, ChangeEvent, useState }      from 'react';
import {
  Tooltip,Divider,Box,FormControl,InputLabel,Card,
  Checkbox,IconButton,Table,TableBody,TableCell,
  TableHead,TablePagination,TableRow,TableContainer,
  Select,MenuItem,Typography,useTheme,CardHeader,Button 
                                        } from '@mui/material';
import Label                              from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';

import BulkActions                        from './BulkActions';

import { useCollapseContext } from '../../../contexts/CollapseToggle';

// Typescript types
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}
interface Filters {
  status?: CryptoOrderStatus; // it is an interface that accept three string values
}

// It filter the rows based on filter selection in the left top cornor of the table
const applyFilters = (cryptoOrders: CryptoOrder[],filters: Filters): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;
    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }
    return matches;
  });
};
// const containsHTML = (str: string): boolean => {
//   const div = document.createElement('div');
//   div.innerHTML = str;
//   console.log(div.childNodes.length)
//   return div.childNodes.length > 0;
// };
const containsHTML = (str: string): boolean => {
  var doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
};
// It return intended slice based on pagination
const applyPagination = (cryptoOrders: CryptoOrder[],page: number,limit: number): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};
const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  // it contains the ids of selected rows
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>([]);
  // it let you know if any rows have been selected
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const { open, toggleOpen } = useCollapseContext();

  // It uses for controlling filter selection in the left top cornor of the table
  const [filters, setFilters] = useState<Filters>({status: null});
  //The list of all options in filter selection in the left top cornor of the table
  const statusOptions = [
    {id: 'all',name: 'All'},
    {id: 'completed',name: 'Completed'},
    {id: 'pending',name: 'Pending'},
    {id: 'failed',name: 'Failed'}
  ];
  //The action handler for filter selection in the left top cornor of the table
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({...prevFilters,status: value}));
  };
  // The checkbox inside the [table header] which either make all rows [selected/unselected]
  const handleSelectAllCryptoOrders = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCryptoOrders(event.target.checked? cryptoOrders.map((cryptoOrder) => cryptoOrder.id): []);
  };
  // it [add/remove] row ids to [selectedCryptoOrders] variable when the user [select/deselect] row
  const handleSelectOneCryptoOrder = (event: ChangeEvent<HTMLInputElement>,cryptoOrderId: string): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [...prevSelected,cryptoOrderId]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>prevSelected.filter((id) => id !== cryptoOrderId));
    }
  };
  // when the user change the table page
  const handlePageChange = (event: any, newPage: number): void => {setPage(newPage);};
  // change table pagination length
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders     = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders    = applyPagination(filteredCryptoOrders,page,limit);
  // it will be [true] if some but not all rows are selected
  const selectedSomeCryptoOrders = selectedCryptoOrders.length > 0 && selectedCryptoOrders.length < cryptoOrders.length;
  // It will be [true] if all rows are selected
  const selectedAllCryptoOrders  = selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {/* When user select a row or more this panel will open */}
      {selectedBulkActions && (<Box flex={1} p={2}><BulkActions /></Box>)}
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
              <Button variant="contained" color="primary" onClick={toggleOpen} sx={{
                fontSize: '1.2rem',
                padding: '10px 40px',
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: 3,
              }}>
                {open ? 'Close' : 'Insert'}
              </Button>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label="Status" autoWidth>
                  {statusOptions.map((statusOption) => (<MenuItem key={statusOption.id} value={statusOption.id}>{statusOption.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
          }
          
        />
      )}
      <Divider />
      {/* The Table */}
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={selectedAllCryptoOrders} indeterminate={selectedSomeCryptoOrders} onChange={handleSelectAllCryptoOrders}/>
              </TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* The content of the table */}
          <TableBody>
            {/* This function [paginatedCryptoOrders] contains current rows after applying [filtering] and [pagination] */}
            {paginatedCryptoOrders.map((cryptoOrder) => {

              // console.log(cryptoOrder.id,containsHTML(cryptoOrder.note))
              // it check if the row is selected or not
              const isCryptoOrderSelected = selectedCryptoOrders.includes(cryptoOrder.id);
              return (
                <TableRow hover  key={cryptoOrder.id}  selected={isCryptoOrderSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary" checked={isCryptoOrderSelected} value={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>handleSelectOneCryptoOrder(event, cryptoOrder.id)} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.currency_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.currency_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.expense_type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.date}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" >
                    {(containsHTML(cryptoOrder.note)) ? 
                    <Typography variant="body2" color="text.secondary" style={{width: '50%'}} dangerouslySetInnerHTML={{ __html: cryptoOrder.note }}></Typography> : 
                    <Typography variant="body2" color="text.secondary" align="left" noWrap>{JSON.parse(cryptoOrder.note)[0]}</Typography>
                    }  
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton color="inherit" size="small" sx={{'&:hover': {background: theme.colors.primary.lighter},color: theme.palette.primary.main}} >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton color="inherit" size="small" sx={{'&:hover': { background: theme.colors.error.lighter },color: theme.palette.error.main}}  >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* The table pagination section */}
      <Box p={2}>
        <TablePagination 
          component="div" count={filteredCryptoOrders.length} page={page} rowsPerPage={limit} rowsPerPageOptions={[5, 10, 25, 30]}
          onPageChange={handlePageChange} onRowsPerPageChange={handleLimitChange}
        />
      </Box>
    </Card>
  );
};
// interface RecentOrdersTableProps {
//   cryptoOrders: [];
// }
// RecentOrdersTable.propTypes = {
//   cryptoOrders: PropTypes.array.isRequired
// };
// RecentOrdersTable.defaultProps = {
//   cryptoOrders: []
// };
export default RecentOrdersTable;