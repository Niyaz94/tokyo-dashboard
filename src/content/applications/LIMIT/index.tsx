import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';

import { 
  ExpenseSingleSampleInterface,
  TransactionUniqueInterface as ExpenseUniqueInterface,PaginationTableDataInterface
} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<PaginationTableDataInterface<ExpenseSingleSampleInterface>> = useFetch <PaginationTableDataInterface<ExpenseSingleSampleInterface>>('money/limit',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success}: FetchData<ExpenseUniqueInterface> = useFetch <ExpenseUniqueInterface>('money/limit/unique',{
    type:[],
    currency:[],
    years:[],
    months:[]
  });

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={unique_data} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Transaction - Expense Limit">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

