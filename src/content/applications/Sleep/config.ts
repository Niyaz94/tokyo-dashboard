import { StatusCase1 as sleepStatus }        from '../../../utility/function/data';
import {dailySearch}                    from "../../../utility/function/main"

export const sleepFormFields = [
    { size:4,type: "time", key: "bedTime", label: "Bed Time" },
    { size:4,type: "time", key: "approxFellSleepTime", label: "Fell Sleep Time" },
    { size:4,type: "time", key: "morningWakingUp", label: "Waking Up Time" },

    { size:4,type: "d_autocomplete", key: "daily", label: "Select The Day", optionfun: dailySearch },
    { size:4,type: "autocomplete", key: "morningFeeling", label: "Morning Feeling", options: sleepStatus },
    { size:4,type: "autocomplete", key: "SleepState", label: "Sleep State", options: sleepStatus },

    { size:4, type: "number", key: "dayTimeSleepInMinutes", label: "Day Time Sleep",min:0 ,max:600,required:true},
    { size:4, type: "number", key: "peeCountDuringNight", label: "Pee Count During Night",min:0 ,max:10,required:true},
    { size:4, type: "number", key: "approxWakingNum", label: "Waking Up Time",min:0 ,max:10,required:true},  

    { size:6,type: "switch", key: "isSleepControl", label: "Do You Control Your Sleep?"},
    { size:6,type: "switch", key: "isEatDrinkBeforeSleep", label: "Do You Eat or Drink Before Sleep?" },

    { size:6,  type: "editor", key: "whatYouThink", label: "What You Think" },
    { size:6,  type: "editor", key: "sleepNotes", label: "Sleep Notes" },
];
