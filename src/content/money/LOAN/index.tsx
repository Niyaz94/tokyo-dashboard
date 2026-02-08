import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';
import ErrorHandler                   from '../../../components/Custom/ErrorTemplate';

import { TransactionUniqueInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data:unique_data,success:unque_success}: FetchData<TransactionUniqueInterface> = useFetch <TransactionUniqueInterface>('money/loan/unique',{
    type:[],currency:[]
  });

  if (!unque_success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider secondaryData={unique_data}>
      <Template templateTitle="Transaction - Loan">
        <Routes>
          <Route path=""    element={<ErrorHandler><PageTable /></ErrorHandler>} />
          
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

