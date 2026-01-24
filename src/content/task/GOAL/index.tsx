import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import {GoalUniqueInterface}          from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';
import ErrorHandler                   from '../../../components/Custom/ErrorTemplate';

export default () =>{

  const { data:unique_data,success}: FetchData<GoalUniqueInterface> = useFetch <GoalUniqueInterface>('schedule/goal/unique',{
    goal_status:[], goal_level:[]
  });

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider secondaryData={unique_data} >
      <Template templateTitle="Goals - Goal">
        <Routes>
          <Route path=""    element={<ErrorHandler><PageTable /></ErrorHandler>} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

