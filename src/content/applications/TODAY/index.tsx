import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {ActivityProvider}             from '../../../store/context/activityContext';
import { RecentDailyTableInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<RecentDailyTableInterface> = useFetch <RecentDailyTableInterface>('notes/daily',{data:[]});


  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <ActivityProvider tableData={data} >
      <Template templateTitle="Perosnal - Today">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </ActivityProvider>

  );
}

