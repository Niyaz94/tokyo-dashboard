import { Card }               from '@mui/material';
import GoalTable          from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

function MainPage() {

  const { data,success}: FetchData<[]> = useFetch <[]>('schedule/goal',[]);

  return (
    <Card>
      <GoalTable data={data} />
    </Card>
  );
}
export default MainPage;
