import { useState, useEffect } from 'react';

interface Option {
  id: string | number;
  name: string;
}

export const useSelectOptions = (apiEndpoint: string) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/${apiEndpoint}`);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching select options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [apiEndpoint]);

  return { options, loading };
};