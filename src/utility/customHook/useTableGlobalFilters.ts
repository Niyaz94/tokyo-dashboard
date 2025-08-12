import { useCallback,useMemo } from 'react';
import { useDispatch,useSelector }  from 'react-redux';

import { RootState }                from '../../store/Reducer';
import {setFilters}             from '../../store/slice/tableFilter';


export const useTableGlobalFilters = (tableFilterKey: string) => {

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) =>state.tableFilter[tableFilterKey]);

  // const [filters, setFilters] = useState<T>(initialFilters);

  const handleFilterChange = useCallback((key: string, value: any) => {
    
    if (value === null && typeof filters[key] === 'string') {
      value = 'all';
    }
    // setFilters((prev) => ({...prev,[key]: value,}));
    dispatch(setFilters({filterName: tableFilterKey, filterKey: key, filterValue: value}));
    
  }, [filters]);

const filterQuery = useMemo(() => {
    const queryParts: string[] = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== 'all') {
        const mappedKey = key
            //   .replace(/^tf/, '')        
          .replace(/^[A-Z]/, (m) => m.toLowerCase()); // Lowercase first char

        queryParts.push(`${mappedKey}=${encodeURIComponent(value)}`);
      }
    });

    return `${queryParts.join('&')}${queryParts.length > 0 ? '&' : ''}`;
  }, [filters]);

  return {filters,handleFilterChange,filterQuery};
};
