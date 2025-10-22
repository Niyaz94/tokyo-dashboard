import { StatusCase1, StatusCase2 } from "../../../utility/function/data";

export const todayFormFields = [
    { size:4,type: "date", key: "date", label: "Date" },
    { size:4,type: "autocomplete", key: "infoConsumptionLevel", label: "Info Consumption Level", options: StatusCase2 },
    { size:4,type: "autocomplete", key: "worryingLevel", label: "Worrying Level", options: StatusCase1 },

    { size:4, type: "number", key: "usefulTimeInMinutes", label: "Useful Time In Minutes",min:0 ,max:5,required:true},
    { size:4, type: "number", key: "wastedTimeInMinutes", label: "Wasted Time In Minutes",min:0 ,max:600,required:true},
    { size:4, type: "number", key: "successRate", label: "Success Rate (%)",min:0 ,max:100,required:true},  

    { size:3,type: "switch", key: "isBusyDay", label: "Is Busy Day" },
    { size:3,type: "switch", key: "isMeditation", label: "Is Meditation" },
    { size:3,type: "threeStateSwitch", key: "successStatus", label: "Success Status"},
    { size:3,type: "switch", key: "isListenToMusic", label: "Is Listen To Music" },

    { size:6,  type: "editor", key: "dailyNotes", label: "Daily Notes" },
    { size:6,  type: "editor", key: "whatToDoBetter", label: "What To Do Better" },
    { size:12, type: "editor", key: "dailyThink", label: "TYDW?" },
];
