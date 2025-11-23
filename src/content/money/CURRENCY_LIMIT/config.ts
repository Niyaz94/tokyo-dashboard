export const formFields = (dynamicData:any)=>[
    { fieldType:"form",size:6,type: "date", key: "startDate", label: "Start Date" },
    { fieldType:"form",size:6,type: "date", key: "endDate", label: "End Date" },
    { fieldType:"form",size:6,type: "autocomplete", key: "currency", label: "Select Currency", options: dynamicData.currency},
    { fieldType:"form",size:6, type: "number", key: "amount", label: "Limit Amount",min:0 ,max:100000000,required:true},  
    { fieldType:"form",size:12, type: "editor", key: "note", label: "Currency Limit Notes" },

    { fieldType:"filter",type: "date", key: "startDate", label: "Start Date",minWidth:250},
    { fieldType:"filter",type: "date", key: "endDate", label: "End Date" ,minWidth:250},
    { fieldType:"filter",type: "autocomplete", key: "currencyId", label: "Select Currency", options: dynamicData.currency ,minWidth:250},
    { fieldType:"filter",type: "filterField", key: "amount", label: "Amount" ,minWidth:250},
];
