import { useDispatch,useSelector }  from 'react-redux';
import { RootState }                from '../../store/Reducer';

import { ChangeEvent } from 'react';
import {setPage,setLimit,setFilter}             from '../../store/slice/tablePagination';


export default (name: string) => {
  const dispatch = useDispatch();

  const pagination = useSelector((state: RootState) =>
    state.tablePagination.find((item) => item.name === name)
  );

  const page = pagination?.page ?? 0;
  const limit = pagination?.limit ?? 10;
  const {field:fieldName,order} = pagination?.filter ?? {field:"id",order:"asc"};

  const handlePageChange = (_event: any, newPage: number): void => {
    // const direction = newPage > page ? 'next' : 'previous'; // To know the direction of page change
    dispatch(setPage({ name, page: newPage }));
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setLimit({ name, limit: parseInt(event.target.value) }));
  };
  const handleFilterHeaderChange = (field: string, order: 'asc' | 'desc') => {
    dispatch(setFilter({ name, filter: { field, order } }));
  }

  return { page, limit,fieldName,order, handlePageChange, handleLimitChange,handleFilterHeaderChange };
};
