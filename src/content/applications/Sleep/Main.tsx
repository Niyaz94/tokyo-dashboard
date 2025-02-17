import { Card }               from '@mui/material';
import SleepTable             from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

function SleepPage() {

  const { data,success}: FetchData<[]> = useFetch <[]>('notes/sleep',[]);
  return (
    <Card>
      <SleepTable sleepData={data} />
    </Card>
  );
}
export default SleepPage;
