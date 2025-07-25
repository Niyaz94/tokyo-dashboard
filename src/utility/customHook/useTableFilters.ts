import { useState, useCallback,useMemo } from 'react';

type Filters = Record<string, any>;

export const useTableFilters = <T extends Filters>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const handleFilterChange = useCallback((key: keyof T, value: any) => {
    // Replace null with "all" if desired — customize per use case
    if (value === null && typeof filters[key] === 'string') {
      value = 'all';
    }
    setFilters((prev) => ({...prev,[key]: value,}));
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

    // Always include tag and status explicitly, even if value is "all"
    // queryParts.unshift(`tag=${filters['tfTags']}`);
    // queryParts.unshift(`status=${filters['tfStatus']}`);

    return `${queryParts.join('&')}${queryParts.length > 0 ? '&' : ''}`;
  }, [filters]);

  return {filters,setFilters,handleFilterChange,filterQuery};
};
