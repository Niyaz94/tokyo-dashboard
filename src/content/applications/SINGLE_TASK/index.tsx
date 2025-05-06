import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { PaginationTableDataInterface,SingleTaskRowSampleInterface,SingleTaskUniqueInterface}   from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';


/**
 * Add multi value filter for the table
 */

export default () =>{
  const { data,success}: FetchData<PaginationTableDataInterface<SingleTaskRowSampleInterface>> = useFetch <PaginationTableDataInterface<SingleTaskRowSampleInterface>>('schedule/stask/',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success}: FetchData<SingleTaskUniqueInterface> = useFetch <SingleTaskUniqueInterface>('schedule/stask/unique',{priority:[],status:[],type:[]});

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={unique_data} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Goals - Single Task">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

