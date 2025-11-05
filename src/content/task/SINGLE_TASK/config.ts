
import { filterStatusOptions_2 as single_task_status } from '../../../utility/function/data';

export const inputFields = ({singleTaskPriority,singleTaskType})=>[
    { fieldType:"filter",type: "autocomplete", key: "priority", label: "Task Priority", options: singleTaskPriority ,minWidth:300},
    { fieldType:"filter",type: "m_autocomplete", key: "type", label: "Task Type", options: singleTaskType ,minWidth:300},
    { fieldType:"filter",type: "m_autocomplete", key: "status", label: "Task Status", options: single_task_status ,minWidth:300}, 
    { fieldType:"filter",type: "textSearch", key: "title", label: "Search for Task" ,minWidth:250},
    { fieldType:"filter",type: "filterField", key: "numPriority", label: "Priority Number" ,minWidth:250},

];
