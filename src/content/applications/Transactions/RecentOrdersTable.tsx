import { FC, ChangeEvent, useState, JSX } from 'react';
import { format }                         from 'date-fns';
import numeral                            from 'numeral';

import {
  Tooltip,Divider,Box,FormControl,InputLabel,Card,
  Checkbox,IconButton,Table,TableBody,TableCell,
  TableHead,TablePagination,TableRow,TableContainer,
  Select,MenuItem,Typography,useTheme,CardHeader
                                        } from '@mui/material';

import Label                              from 'src/components/Label';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon                    from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon                  from '@mui/icons-material/DeleteTwoTone';
import BulkActions                        from './BulkActions';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

// Typescript types
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}
interface Filters {
  status?: CryptoOrderStatus; // it is an interface that accept three string values
}



// Return the label element for [Status] column
const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed:     {text: 'Failed'   ,color: 'error'},
    completed:  {text: 'Completed',color: 'success'},
    pending:    {text: 'Pending'  ,color: 'warning'}
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};
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
        <CardHeader title="Recent Orders" action={
            <Box width={150}>
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
              <TableCell>Order Details</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* The content of the table */}
          <TableBody>
            {/* This function [paginatedCryptoOrders] contains current rows after applying [filtering] and [pagination] */}
            {paginatedCryptoOrders.map((cryptoOrder) => {
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
                      {cryptoOrder.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.sourceDesc}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cryptoOrder.amountCrypto}
                      {cryptoOrder.cryptoCurrency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(cryptoOrder.amount).format(`${cryptoOrder.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
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
// RecentOrdersTable.propTypes = {
//   cryptoOrders: PropTypes.array.isRequired
// };
// RecentOrdersTable.defaultProps = {
//   cryptoOrders: []
// };
export default RecentOrdersTable;