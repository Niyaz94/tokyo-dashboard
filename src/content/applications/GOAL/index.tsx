import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { PaginationTableDataInterface,GoalSampleInterface,GoalUniqueInterface}   from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';


export default () =>{
  const { data,success}: FetchData<PaginationTableDataInterface<GoalSampleInterface>> = useFetch <PaginationTableDataInterface<GoalSampleInterface>>('schedule/goal',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success}: FetchData<GoalUniqueInterface> = useFetch <GoalUniqueInterface>('schedule/goal/unique',{
    goal_status:[], goal_level:[]
  });

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider 
      tableData={results} 
      secondaryData={unique_data} 
      paginData={{count: count, next: next, previous: previous}}
    >
      <Template templateTitle="Goals - Goal">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

