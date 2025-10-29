import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';

import { 
  IoanSingleSampleInterface,
  TransactionUniqueInterface,PaginationTableDataInterface
} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<PaginationTableDataInterface<IoanSingleSampleInterface>> = useFetch <PaginationTableDataInterface<IoanSingleSampleInterface>>('money/loan',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success}: FetchData<TransactionUniqueInterface> = useFetch <TransactionUniqueInterface>('money/loan/unique',{
    type:[],currency:[]
  });

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={unique_data} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Transaction - Loan">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

