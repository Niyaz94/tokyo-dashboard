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

export  const columnsTask:Column[] = [
    { label: 'Task Date', align: 'center' },
    { label: 'Goal Detail', align: 'center' },
    { label: 'Task Detail', align: 'center' },
    { label: 'Prize', align: 'center' },
    { label: 'Status', align: 'center' },
    { label: 'Actions', align: 'right' }
];

export  const columnsRecipe:Column[] = [
    { label: 'Date', align: 'left' },
    { label: 'Title', align: 'center' },
    { label: 'Delicious Level', align: 'center' },
    { label: 'Last Update', align: 'center' },
    { label: 'Actions', align: 'right' }
];