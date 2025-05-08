import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';
import { Routes, Route }              from "react-router-dom";

import Template               from '../../../components/Page/Template';
import {PageProvider}         from '../../../store/context/pageContext';

import PageTable              from './Table';
import AddEdit                from './AddEdit';
import { RecentSleepTableInterface} from 'src/utility/types/data_types';


export default () =>{
  const { data,success}: FetchData<RecentSleepTableInterface> = useFetch <RecentSleepTableInterface>('notes/sleep',[]);
  if (!success) {
    return <p>Loading...</p>;
  }
  return (
    <PageProvider tableData={data} >
      <Template templateTitle="Perosnal - Sleep">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PageProvider>
  );
}

