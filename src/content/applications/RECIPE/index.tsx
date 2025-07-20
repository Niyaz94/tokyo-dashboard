import Template                       from '../../../components/Page/Template';
import useFetch, {FetchData}          from '../../../utility/customHook/useGetAPI';
import PageTable                      from './Table';
import AddEdit                        from './AddEdit';
import { Routes, Route }              from "react-router-dom";
import {PageProvider}             from '../../../store/context/pageContext';
import { RecipeSingleSampleInterface} from 'src/utility/types/data_types';


export default () =>{

  const { data,success}: FetchData<RecipeSingleSampleInterface[]> = useFetch <RecipeSingleSampleInterface[]>('notes/recipe',[]);

  if (!success) {
    return <p>Loading...</p>;
  }

  return (
    <PageProvider tableData={data}>
      <Template templateTitle="Extra - Food Recipe">
        <Routes>
          <Route path=""    element={ <PageTable/>} />
          <Route path="add" element={ <AddEdit/>} />
          <Route path=":id" element={ <AddEdit/>} />
        </Routes>
      </Template>
    </PageProvider>

  );
}

