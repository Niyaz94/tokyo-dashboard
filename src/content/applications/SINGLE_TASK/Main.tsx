import { Card }               from '@mui/material';
import ActivityTable          from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

function MainPage() {

  const { data,success}: FetchData<[]> = useFetch <[]>('schedule/stask',[]);

  console.log(data)
  return (
    <Card>
      <ActivityTable data={Object.keys(data).length>0?data["data"]:[]} unique_type={Object.keys(data).length>0?data["unique_type"]:[]} />
    </Card>
  );
}
export default MainPage;
