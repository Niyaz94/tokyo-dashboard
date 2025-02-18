import { Card }               from '@mui/material';
import ActivityTable          from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

function ActivityPage() {

  const { data,success}: FetchData<[]> = useFetch <[]>('notes/activity',[]);
  return (
    <Card>
      <ActivityTable activityData={data} />
    </Card>
  );
}
export default ActivityPage;
