import Template               from '../../../components/Page/Template';
import useFetch, {FetchData}  from '../../../utility/customHook/useGetAPI';
import SleepTable             from './Table';


export default () =>{
  const { data,success}: FetchData<[]> = useFetch <[]>('notes/sleep',[]);
  return (
    <Template templateTitle="Personal - Sleep">
      <SleepTable sleepData={data} />
    </Template>
  );
}

