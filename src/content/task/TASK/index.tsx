import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import {TaskUniqueInterface}          from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';


export default () =>{

  console.log("Index Task Page")
  // const { data,success}: FetchData<TaskUniqueInterface> = useFetch <TaskUniqueInterface>('schedule/task/unique',{
  //   months:{},years:[], goal_status:[], goal_level:[]
  // });

  // if (!success) {
  //   return <p>Loading...</p>;
  // }

  return (
    <PaginationProvider >
      <Template templateTitle="Goals - Task">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

