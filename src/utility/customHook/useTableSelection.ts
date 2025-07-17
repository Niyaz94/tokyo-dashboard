import { useState, ChangeEvent } from 'react';

export const useTableSelection = <T extends { id: string }>(tableData: T[]) => {

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectOne = (_event: ChangeEvent<HTMLInputElement>, id: string): void => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedIds(event.target.checked ? tableData.map(({ id }) => id) : []);
  };

  const isSelected = (id: string) => selectedIds.includes(id);
  const allSelected = selectedIds.length === tableData.length && tableData.length > 0;
  const someSelected = selectedIds.length > 0 && selectedIds.length < tableData.length;


  return {selectedIds,setSelectedIds,handleSelectOne,handleSelectAll,isSelected,someSelected,allSelected};
};
