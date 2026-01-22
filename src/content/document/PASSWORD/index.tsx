import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PageProvider}             from '../../../store/context/pageContext';

import { TopicSingleSampleInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<TopicSingleSampleInterface[]> = useFetch <TopicSingleSampleInterface[]>('document/password',[]);

   const { data:unique_data,success:unque_success}: FetchData<{type:string[]}> = useFetch <{type:string[]}>('document/password/unique',{
      type:[]
    });
  
    if (!success || !unque_success) {
      return <p>Loading...</p>;
    }

  return (
    <PageProvider tableData={data} secondaryData={unique_data}>
      <Template templateTitle="Documents - Document">
        <Routes>
          <Route path=""    element={ <PageTable/>} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PageProvider>

  );
}

