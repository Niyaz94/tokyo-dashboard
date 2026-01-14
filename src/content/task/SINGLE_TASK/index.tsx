import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import {SingleTaskUniqueInterface}    from 'src/utility/types/data_types';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';

export default () =>{
  const { data,success}: FetchData<SingleTaskUniqueInterface> = useFetch <SingleTaskUniqueInterface>('schedule/stask/unique',{type:[]});

  if (!success) {
    return <p>Loading...</p>;
  }
  return (
    <PaginationProvider tableData={[]} secondaryData={data}>
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

