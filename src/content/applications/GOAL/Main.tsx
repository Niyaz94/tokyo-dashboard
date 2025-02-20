import { Card }               from '@mui/material';
import GoalTable          from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';
import { GoalRecordInterface}   from 'src/utility/types/data_types';

function MainPage() {

  const { data,success}: FetchData<GoalRecordInterface> = useFetch <GoalRecordInterface>('schedule/goal',{data:[],unique:{}});

  return (
    <Card>
      {data.data.length>0 && <GoalTable {...data} />}
    </Card>
  );
}
export default MainPage;
