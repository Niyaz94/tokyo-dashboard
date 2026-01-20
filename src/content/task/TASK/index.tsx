import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import {TaskUniqueInterface}          from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';


export default () =>{

  const { data,success}: FetchData<TaskUniqueInterface> = useFetch <TaskUniqueInterface>('schedule/task/unique',{
    months:{},years:[], goal_status:[], goal_level:[],status:[]
  });


  if (!success) {
    return <p>Loading...</p>;
  }
  return (
    <PaginationProvider secondaryData={data}>
      <Template templateTitle="Goals - Task" >
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

