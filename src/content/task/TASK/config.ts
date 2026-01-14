
import {goalSearch,monthlySearch}                from '../../../utility/function/main';
export const inputFields = ({memTaskStatus})=>[

    { fieldType:"form",size:4,type: "text", key: "name", label: "Task Name" },
    { fieldType:"form",size:4,type: "text", key: "tag", label: "Task Tag" },
    { fieldType:"form",size:4,type: "autocomplete",key: "status",label:"Select Task Status", options: memTaskStatus },

    { fieldType:"form",size:6,type: "d_autocomplete", key: "goal", label: "Select The Goal", optionfun: goalSearch },
    { fieldType:"form",size:6,type: "d_autocomplete", key: "month", label: "Select The Month", optionfun: monthlySearch },
    
    { fieldType:"form",size:6, type: "number", key: "percentage", label: "Dedicated Success in %",min:0 ,max:100,required:true}, 
    { fieldType:"form",size:6, type: "number", key: "result", label: "Result Success in %",min:0 ,max:100,required:true}, 
    { fieldType:"form",size:6, type: "number", key: "prizeAmount", label: "Prize Amount",min:0 ,max:1000,required:true}, 
    { fieldType:"form",size:6, type: "number", key: "dailyTime", label: "Dedicated Time in Minutes",min:0 ,max:300,required:true}, 


    { fieldType:"form",size:12, type: "editor", key: "description", label: "Task Description" },
    { fieldType:"form",size:12, type: "editor", key: "resultDescription", label: "Task Conclusion" },
    { fieldType:"form",size:12, type: "editor", key: "prizeDetail", label: "Task Prize" },
];
