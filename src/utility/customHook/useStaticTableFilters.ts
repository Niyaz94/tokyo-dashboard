import { useMemo } from 'react';

export function useStaticTableFilters<T>(data: T[],filters: Record<string, any>,page: number,limit: number) {
  
  // Apply filters using useMemo
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '' || value === null || value === 'all') return true;
        return row[key as keyof T] === value;
      });
    });
  }, [data, filters]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    const start = page * limit;
    const end = start + limit;
    return filteredData.slice(start, end);
  }, [filteredData, page, limit]);

  return {paginatedData,filteredData};
}
