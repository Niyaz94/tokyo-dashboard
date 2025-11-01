export const expenseFormFields = (dynamicData:any)=>[
    // { fieldType:"form",size:6,type: "autocomplete", key: "category", label: "Select Loan Type", options: dynamicData.loanTypes },
    // { fieldType:"form",size:6,type: "autocomplete", key: "currency", label: "Select Currency Type", options: dynamicData.currencyTypes },
    { fieldType:"form",size:4,type: "date", key: "date", label: "Date" },
    // { fieldType:"form",size:4,type: "date", key: "expectedReturnDate", label: "Expected Return Date" },
    // { fieldType:"form",size:4, type: "number", key: "amount", label: "Loan Amount",min:0 ,max:100000000,required:true},  
    // { fieldType:"form",size:12,type: "switch", key: "consider", label: "Do you want to consider this Loan?" },
    // { fieldType:"form",size:12, type: "editor", key: "note", label: "Loan Notes" },

    { fieldType:"filter",type: "date", key: "startDate", label: "Start Date",minWidth:200},
    { fieldType:"filter",type: "date", key: "endDate", label: "End Date" ,minWidth:200},
    { fieldType:"filter",type: "autocomplete", key: "expenseId", label: "Select Expense Type", options: dynamicData.expense_types ,minWidth:300},
    { fieldType:"filter",type: "autocomplete", key: "currencyId", label: "Select Expense Currency", options: dynamicData.expense_currency ,minWidth:300},
    { fieldType:"filter",type: "filterField", key: "amount", label: "Amount" ,minWidth:250},

];
