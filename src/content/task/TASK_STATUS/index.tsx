import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { PaginationTableDataInterface,TaskStatusRowSampleInterface,TaskStatusUniqueInterface}   from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';


export default () =>{
  const { data,success}: FetchData<PaginationTableDataInterface<TaskStatusRowSampleInterface>> = useFetch <PaginationTableDataInterface<TaskStatusRowSampleInterface>>('schedule/task_status/plist',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success}: FetchData<TaskStatusUniqueInterface> = useFetch <TaskStatusUniqueInterface>('schedule/task_status/unique',{task_type:[],task_tags:[]});

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={unique_data} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Goals - Task Progress">
        <Routes>
          <Route path=""    element={<PageTable />} />
          {/* <Route path=""    element={<PageTable tableData={tableData} />} /> */}
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
          {/* <Route path=":ids" element={<AddEdit />} /> */}
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

