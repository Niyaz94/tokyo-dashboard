import { Card }               from '@mui/material';
import GoalTable          from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

function MainPage() {

  const { data,success}: FetchData<[]> = useFetch <[]>('schedule/goal',{data:[],unique:{}});

  return (
    <Card>
      {/* {data.data.length>0 && <GoalTable {...data} />} */}
    </Card>
  );
}
export default MainPage;
