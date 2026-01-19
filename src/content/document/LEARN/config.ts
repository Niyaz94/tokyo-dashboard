export const inputFields = (dynamicData:any)=>[
    { fieldType:"form",size:6,  type: "text", key: "title", label: "Learn Title" },
    { fieldType:"form",size:6, type: "m_autocomplete",  key: "type_ids", label: "Select Learn Type",   options: dynamicData.memLearnTypes,buttonUrl:'/Learns/Learn_type/add'},
    { fieldType:"form",size:12, type: "fileUploader", key: "image",key2:"url_image", label: "Upload Files",allowMulti:true },
    { fieldType:"form",size:12, type: "editor", key: "notes", label: "Learn Details" },



    // { fieldType:"filter",type: "autocomplete", key: "priority", label: "Task Priority", options: dynamicData.singleTaskPriority ,minWidth:300},
    // { fieldType:"filter",type: "m_autocomplete", key: "type", label: "Task Type", options: dynamicData.singleTaskType ,minWidth:300},
    // { fieldType:"filter",type: "m_autocomplete", key: "status", label: "Task Status", options: single_task_status ,minWidth:300}, 
    // { fieldType:"filter",type: "textSearch", key: "title", label: "Search for Task" ,minWidth:250},
    // { fieldType:"filter",type: "filterField", key: "numPriority", label: "Priority Number" ,minWidth:250},

];
