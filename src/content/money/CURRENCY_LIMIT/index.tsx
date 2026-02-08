import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';
import ErrorHandler                   from '../../../components/Custom/ErrorTemplate';

interface TUI{
  currency:string[];
}

export default () =>{

  const { data:unique_data,success:unque_success}: FetchData<TUI> = useFetch <TUI>('money/currency_limit/unique',{
    currency:[]
  });

  if (!unque_success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider secondaryData={unique_data}>
      <Template templateTitle="Transactions - Currency Limits">
        <Routes>
          <Route path=""    element={<ErrorHandler><PageTable /></ErrorHandler>} />

          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

