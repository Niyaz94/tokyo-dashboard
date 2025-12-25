import Template                       from '../../../components/Page/Template';
import PageTable                      from './Filter';
import { Routes, Route }              from "react-router-dom";
import {PageProvider}                 from '../../../store/context/pageContext';


export default () =>{

  return (
    <PageProvider tableData={[]}>
      <Template templateTitle="Report - Daily Success" >
        <Routes>
          <Route path=""    element={ <PageTable/>} />
        </Routes>
      </Template>
    </PageProvider>

  );
}

