import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { TaskStatusRecordInterface}   from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {TaskStatusProvider}           from '../../../store/context/tastStatusContext';


export default () =>{
  const { data,success}: FetchData<TaskStatusRecordInterface> = useFetch <TaskStatusRecordInterface>('schedule/task_status',{data:[],unique:{}});
  const {data:tableData,unique} = data;

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <TaskStatusProvider tableData={tableData} secondaryData={unique} >
      <Template templateTitle="Goals - Task Progress">
        <Routes>
          <Route path=""    element={<PageTable />} />
          {/* <Route path=""    element={<PageTable tableData={tableData} />} /> */}
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </TaskStatusProvider>

  );
}

