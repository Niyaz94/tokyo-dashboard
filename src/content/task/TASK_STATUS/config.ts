
import {TaskStatusStatus} from '../../../utility/function/data';

export const inputFields = (dynamicData:any)=>[
    { fieldType:"filter",type: "date", key: "startDate", label: "Start Date",minWidth:250},
    { fieldType:"filter",type: "date", key: "endDate", label: "End Date" ,minWidth:250},
    { fieldType:"filter",type: "autocomplete", key: "status", label: "Task Status", options: TaskStatusStatus ,minWidth:300},
    { fieldType:"filter",type: "autocomplete", key: "type", label: "Task Type", options: dynamicData.task_type ,minWidth:300},
    { fieldType:"filter",type: "autocomplete", key: "tag", label: "Task Tag", options: dynamicData.task_tag ,minWidth:300},
    
];
