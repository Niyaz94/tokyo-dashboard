import { Card }               from '@mui/material';
import RecentOrdersTable      from './RecentOrdersTable';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

function RecentOrders() {

  const { data,success}: FetchData<[]> = useFetch <[]>('notes/expense',[]);
  return (
    <Card>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}
export default RecentOrders;
