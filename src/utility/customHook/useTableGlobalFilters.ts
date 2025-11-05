import { useCallback,useMemo } from 'react';
import { useDispatch,useSelector }  from 'react-redux';

import { RootState }  from '../../store/Reducer';
import {setFilters}   from '../../store/slice/tableFilter';


export const useTableGlobalFilters = (tableFilterKey: string) => {

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) =>state.tableFilter[tableFilterKey]);

  // const [filters, setFilters] = useState<T>(initialFilters);

  const handleFilterChange = useCallback((key: string, value: any) => {

    
    if (value === null && typeof filters[key] === 'string') {
      value = 'all';
    }
    if(Array.isArray(value) ) {
      // && ( value.includes('all'))
      if (value[-1]=== 'all') {
        value = ['all'];
      }else{
        value = value.filter((item) => item !== 'all');
      }
    }

    dispatch(setFilters({filterName: tableFilterKey, filterKey: key, filterValue: value}));
    
  }, [filters]);

const filterQuery = useMemo(() => {
    const queryParts: string[] = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== 'all') {
        const mappedKey = key.replace(/^[A-Z]/, (m) => m.toLowerCase());

        if(value && typeof value === 'object' && 'operator' in value && 'value' in value){
          if(value.value.toString().length>0)
            queryParts.push(`${key}_value=${encodeURIComponent(value.value)}&${key}_operator=${encodeURIComponent(value.operator)}`);
        }else if(value && typeof value === 'object' && 'label' in value && 'value' in value ){
          if (value.value!==null && value.value !== "all")
            queryParts.push(`${key}=${encodeURIComponent(value.value)}`);
        }else if (Array.isArray(value)) {
          queryParts.push(`${mappedKey}=${encodeURIComponent(value.join(','))}`);
        }else{
          queryParts.push(`${mappedKey}=${encodeURIComponent(value.toString())}`);
        }

      }
    });

    return `${queryParts.join('&')}${queryParts.length > 0 ? '&' : ''}`;
  }, [filters]);

  return {filters,handleFilterChange,filterQuery};
};
