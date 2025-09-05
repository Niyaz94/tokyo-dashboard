import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {TaskStatusProvider}           from '../../../store/context/taskStatusContext';

import { CurrencyeSingleSampleInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<CurrencyeSingleSampleInterface[]> = useFetch <CurrencyeSingleSampleInterface[]>('money/currency',[]);

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <TaskStatusProvider tableData={data} secondaryData={{}}>
      <Template templateTitle="Currency">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </TaskStatusProvider>

  );
}

