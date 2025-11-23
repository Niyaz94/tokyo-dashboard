import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PaginationProvider}           from '../../../store/context/paginationContext';

import { 
  CurrencyLimitRowInt as TI,
  PaginationTableDataInterface as PI
} from 'src/utility/types/data_types';

interface TUI{
  currency:string[];
}

export default () =>{

  const { data,success}: FetchData<PI<TI>> = useFetch <PI<TI>>('money/currency_limit',{results:[],count:0,next:null,previous:null});
  const {results,count,next,previous} = data;

  const { data:unique_data,success:unque_success}: FetchData<TUI> = useFetch <TUI>('money/currency_limit/unique',{
    currency:[]
  });

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PaginationProvider tableData={results} secondaryData={unique_data} paginData={{count: count, next: next, previous: previous}}>
      <Template templateTitle="Transactions - Currency Limits">
        <Routes>
          <Route path=""    element={<PageTable />} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PaginationProvider>

  );
}

