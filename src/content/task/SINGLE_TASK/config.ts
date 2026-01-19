
import { filterStatusOptions_2 as single_task_status } from '../../../utility/function/data';

export const inputFields = (dynamicData:any)=>[
    { fieldType:"form",size:4,type: "date", key: "deadline", label: "Deadline" },
    { fieldType:"form",size:4,type: "text", key: "title", label: "Task Name" },
    { fieldType:"form",size:4, type: "number", key: "numPriority", label: "Priority by Number",min:0 ,max:100,required:true}, 

    { fieldType:"form",size:6, type: "number", key: "expectedSpendingTime", label: "Expected Spending Time (in minutes)",min:0 ,max:1000,required:true}, 
    { fieldType:"form",size:6, type: "number", key: "spendingTime", label: "Spending Time (in minutes)",min:0 ,max:1000,required:true}, 

    { fieldType:"form",size:6,type: "autocomplete",     key: "status",   label: "Select Task Status", options: dynamicData.memSingleTaskStatus },
    { fieldType:"form",size:6,type: "autocomplete",     key: "priority", label: "Select Priority",    options: dynamicData.memSingleTaskPriority},
    { fieldType:"form",size:12,type: "m_autocomplete",  key: "type_ids", label: "Select Task Type",   options: dynamicData.memSingleTaskType},


    { fieldType:"form",size:12, type: "editor", key: "note", label: "Task Notes" },


    { fieldType:"filter",type: "autocomplete",   key: "priority", label: "Task Priority", options: dynamicData.singleTaskPriority ,minWidth:300},
    { fieldType:"filter",type: "m_autocomplete", key: "type",   label: "Task Type", options: dynamicData.singleTaskType ,minWidth:300},
    { fieldType:"filter",type: "m_autocomplete", key: "status", label: "Task Status", options: single_task_status ,minWidth:300}, 
    { fieldType:"filter",type: "textSearch", key: "title", label: "Search for Task" ,minWidth:250},
    { fieldType:"filter",type: "filterField", key: "numPriority", label: "Priority Number" ,minWidth:250},

];
