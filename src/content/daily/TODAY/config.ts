import { StatusCase1, StatusCase2 } from "../../../utility/function/data";

export const todayFormFields = [
    { fieldType:"form",size:4,type: "date", key: "date", label: "Date" },
    { fieldType:"form",size:4,type: "autocomplete", key: "infoConsumptionLevel", label: "Info Consumption Level", options: StatusCase2 },
    { fieldType:"form",size:4,type: "autocomplete", key: "worryingLevel", label: "Worrying Level", options: StatusCase1 },
    { fieldType:"form",size:4, type: "number", key: "usefulTimeInMinutes", label: "Useful Time In Minutes",min:0 ,max:5,required:true},
    { fieldType:"form",size:4, type: "number", key: "wastedTimeInMinutes", label: "Wasted Time In Minutes",min:0 ,max:600,required:true},
    { fieldType:"form",size:4, type: "number", key: "successRate", label: "Success Rate (%)",min:0 ,max:100,required:true},  
    { fieldType:"form",size:4,type: "switch", key: "isBusyDay", label: "Is Busy Day" },
    { fieldType:"form",size:4,type: "switch", key: "isMeditation", label: "Is Meditation" },
    { fieldType:"form",size:4,type: "threeStateSwitch", key: "successStatus", label: "Success Status"},
    { fieldType:"form",size:6,type: "switch", key: "isListenToMusic", label: "Is Listen To Music" },
    { fieldType:"form",size:6,type: "switch", key: "beingGrateful", label: "Being Grateful"},
    { fieldType:"form",size:6,  type: "editor", key: "dailyNotes", label: "Daily Notes" },
    { fieldType:"form",size:6,  type: "editor", key: "whatToDoBetter", label: "What To Do Better" },
    { fieldType:"form",size:12, type: "editor", key: "dailyThink", label: "TYDW?" },
];
