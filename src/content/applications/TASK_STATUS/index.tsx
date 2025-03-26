import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { TaskStatusRecordInterface}   from 'src/utility/types/data_types';
import { Routes, Route } from "react-router-dom";
import {AddEditProvider,useAddEdit} from '../../../store/Context';
import { useEffect } from 'react';


export default () =>{
  // const { data,success}: FetchData<[]> = useFetch <[]>('notes/sleep',[]);
  const { data,success}: FetchData<TaskStatusRecordInterface> = useFetch <TaskStatusRecordInterface>('schedule/task_status',{data:[],unique:{}});
  // const { setAddEditData } = useAddEdit();
  
  const {data:tableData,unique} = data;

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <AddEditProvider initialData={unique}>
      <Template templateTitle="Goals - Task Progress">
        <Routes>
          <Route path=""    element={<PageTable {...data} />} />
          <Route path="add" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </AddEditProvider>

  );
}

