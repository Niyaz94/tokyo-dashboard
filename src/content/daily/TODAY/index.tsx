import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route,Navigate  }              from "react-router-dom";
import {PageProvider}             from '../../../store/context/pageContext';
import { RecentDailyTableInterface,PaginationTableDataInterface} from 'src/utility/types/data_types';
import {PaginationProvider}           from '../../../store/context/paginationContext';


export default () =>{


  // const { data,success}: FetchData<RecentDailyTableInterface> = useFetch <RecentDailyTableInterface>('notes/daily',{data:[]});

  const { data,success}: FetchData<PaginationTableDataInterface<RecentDailyTableInterface>> = useFetch <PaginationTableDataInterface<RecentDailyTableInterface>>('notes/daily',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;


  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    
    <PaginationProvider tableData={results} secondaryData={{}} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Perosnal - Today">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
          <Route path="*"   element={<Navigate to="/dashboards/crypto" replace />} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

