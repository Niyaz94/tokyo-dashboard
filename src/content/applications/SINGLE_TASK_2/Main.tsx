import { Card }               from '@mui/material';
import ActivityTable          from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

import { SingleTaskRecordInterface}   from 'src/utility/types/data_types';
function MainPage() {



  const { data,success}: FetchData<SingleTaskRecordInterface> = useFetch <SingleTaskRecordInterface>('schedule/stask',{data:[],unique:{}});

  return (
    <Card>
      {data.data.length>0 && <ActivityTable {...data} />}
    </Card>
  );
}
export default MainPage;
