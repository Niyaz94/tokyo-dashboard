import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PageProvider}             from '../../../store/context/pageContext';
import { RecentTomorrowTableInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<RecentTomorrowTableInterface> = useFetch <RecentTomorrowTableInterface>('notes/tomorrow',{data:[]});


  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PageProvider tableData={data}>
      <Template templateTitle="Perosnal - Tomorrow">
        <Routes>
          <Route path=""    element={<PageTable />} />
          {/* <Route path=""    element={<PageTable tableData={tableData} />} /> */}
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PageProvider>

  );
}

