import { Card }           from '@mui/material';
import { CryptoOrder }    from 'src/utility/types/data_types';
import RecentOrdersTable  from './RecentOrdersTable';
import { subDays }        from 'date-fns';
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
