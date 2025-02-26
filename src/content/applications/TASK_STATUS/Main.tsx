import { Card }               from '@mui/material';
import Table                  from './Table';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';

import { TaskStatusRecordInterface}   from 'src/utility/types/data_types';
function MainPage() {



  const { data,success}: FetchData<TaskStatusRecordInterface> = useFetch <TaskStatusRecordInterface>('schedule/task_status',{data:[],unique:{}});
  return (
    <Card>
      {data.data.length>0 && <Table {...data} />}

    </Card>
  );
}
export default MainPage;
