import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';
import { RecentActivityTableInterface,PaginationTableDataInterface} from 'src/utility/types/data_types';


export default () =>{



  const { data,success}: FetchData<PaginationTableDataInterface<RecentActivityTableInterface>> = useFetch <PaginationTableDataInterface<RecentActivityTableInterface>>('notes/activity',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={{}} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Personal - Activity">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>
  );
}

