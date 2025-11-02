import { ExpenseSpendingType }   from '../../../utility/function/data';

export const expenseFormFields = (dynamicData:any)=>[
    { fieldType:"form",size:6,type: "autocomplete", key: "category", label: "Select Expense Type", options: dynamicData.expense_category },
    { fieldType:"form",size:6,type: "autocomplete", key: "currency", label: "Select Expense Currency", options: dynamicData.expense_currency},
    { fieldType:"form",size:6,type: "date", key: "date", label: "Date" },
    { fieldType:"form",size:6, type: "number", key: "amount", label: "Expense Amount",min:0 ,max:100000000,required:true},  
    { fieldType:"form",size:6,type: "autocomplete", key: "spendingType", label: "Spending Type", options: ExpenseSpendingType },
    { fieldType:"form",size:6, type: "number", key: "wastedAmount", label: "Wasted Amount",min:0 ,max:100000000,required:true},  
    { fieldType:"form",size:12,type: "switch", key: "consider", label: "Do you want to consider this Expense?" },
    { fieldType:"form",size:12, type: "editor", key: "note", label: "Expense Notes" },
    { fieldType:"filter",type: "date", key: "startDate", label: "Start Date",minWidth:250},
    { fieldType:"filter",type: "date", key: "endDate", label: "End Date" ,minWidth:250},
    { fieldType:"filter",type: "autocomplete", key: "expenseId", label: "Select Expense Type", options: dynamicData.expense_category ,minWidth:250},
    { fieldType:"filter",type: "autocomplete", key: "currencyId", label: "Select Expense Currency", options: dynamicData.expense_currency ,minWidth:250},
    { fieldType:"filter",type: "filterField", key: "amount", label: "Amount" ,minWidth:250},

];
