import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {TaskStatusProvider}           from '../../../store/context/taskStatusContext';

import { RecentExpenseTableInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<RecentExpenseTableInterface> = useFetch <RecentExpenseTableInterface>('notes/expense',{data:[],unique:{}});
  const {data:tableData,unique} = data;

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <TaskStatusProvider tableData={tableData} secondaryData={unique}>
      <Template templateTitle="Managment - Expense">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </TaskStatusProvider>

  );
}

