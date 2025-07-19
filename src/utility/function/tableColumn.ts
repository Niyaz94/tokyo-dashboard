import {Column} from '../../utility/types/data_types';


export const columnsTaskStatus:Column[] = [
    { label: 'Progress Date', align: 'center' },
    { label: 'Task Detail', align: 'center' },
    { label: 'Note', align: 'center' },
    { label: 'Prize', align: 'center' },
    { label: 'Progress Status', align: 'center' },
    { label: 'Actions', align: 'right' }
];

export  const columnsExpense:Column[] = [
    { label: 'Date', align: 'center' },
    { label: 'Expense Type', align: 'center' },
    { label: 'Amount', align: 'center' },
    { label: 'Note', align: 'center' },
    { label: 'Actions', align: 'center' }
];