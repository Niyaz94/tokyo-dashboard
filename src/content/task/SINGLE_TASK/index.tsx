import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { PaginationTableDataInterface,SingleTaskRowSampleInterface,SingleTaskUniqueInterface}   from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';
import { Navigate } from "react-router-dom";

export default () =>{
  const { data,success,error}: FetchData<PaginationTableDataInterface<SingleTaskRowSampleInterface>> = useFetch <PaginationTableDataInterface<SingleTaskRowSampleInterface>>('schedule/stask/',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success,error:unique_error}: FetchData<SingleTaskUniqueInterface> = useFetch <SingleTaskUniqueInterface>('schedule/stask/unique',{type:[]});


  if (!success || !unque_success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={unique_data} paginData={{ count, next, previous }}>
      <Template templateTitle="Goals - Single Task">
        <Routes>
          <Route index element={<PageTable />} />
          <Route path="add" element={<AddEdit />} />
          <Route path=":id" element={<AddEdit />} />
        </Routes>
      </Template>
    </PaginationProvider>
  );

  
}

