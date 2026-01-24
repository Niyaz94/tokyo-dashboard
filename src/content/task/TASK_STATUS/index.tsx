import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import {TaskStatusUniqueInterface}    from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';
import ErrorHandler                   from '../../../components/Custom/ErrorTemplate';

export default () =>{
  const { data:unique_data,success:unque_success}: FetchData<TaskStatusUniqueInterface> = useFetch <TaskStatusUniqueInterface>('schedule/task_status/unique',{task_type:[],task_tags:[]});

  if (!unque_success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider secondaryData={unique_data} >
      <Template templateTitle="Goals - Task Progress">
        <Routes>
          <Route path=""    element={<ErrorHandler><PageTable /></ErrorHandler>} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

