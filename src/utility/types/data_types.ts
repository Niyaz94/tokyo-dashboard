export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export type level1Status = "VERY_LOW" |  "LOW" |  "NORMAL" |  "HIGH" |  "VERY_HIGH"
export type level2Status =   "LOW" |  "NORMAL" |  "HIGH" 
export type level3Status =   "ACHIEVED" |  "POSTPONED" |  "INPROGRESS" | "COMPLETED" | "HALF_COMPLETED" | "NOT_STARTED" | "FAILED" | "FOLLOWUP"
export type level4Status =  "ACHIEVED" | "POSTPONED" | "INPROGRESS" | "COMPLETED" | "UNCOMPLETED"
export type level5Status =   "LESS" |  "NORMAL" |  "VERY" 


export interface CryptoOrder {
  id: string;
  currency_name: string;
  expense_type: string;
  date: string;
  amount: number;
  note: string;
  status: CryptoOrderStatus;

}

export interface SleepType {
  id: string;
  date: string;
  success: number;
  is_busy: boolean;
  worrying: level1Status;
  activity_level: level1Status;
  morningFeeling: level1Status;
  SleepState: level1Status;
  bedTime: string;
  approxFellSleepTime: string;
  morningWakingUp: string;
  dayTimeSleepInMinutes: number;
  peeCountDuringNight: number;
  approxWakingNum: number;
  burn_calories: number;
}
export interface RecentSleepTableInterface {
  className?: string;
  sleepData: SleepType[];
}

export interface Filters {
  status?: level1Status; // it is an interface that accept three string values
}



export interface ActivityType {
  id: string;
  date: string;
  success: number;
  weight: number;
  consumeWaterInLiter:number;
  is_busy: boolean;
  worrying: level1Status;
  activityLevel: level1Status;
  SleepState: level1Status;
  eatingLevel:level2Status;
  minBurnCalories: number;
  isGoingGym:boolean;
  is_meditation:boolean;
}

export interface RecentActivityTableInterface {
  className?: string;
  activityData: ActivityType[];
}


export interface SingleTaskSampleInterface {
  id: string;
  date: string;
  type_name: string;
  description: string[];
  title:string;
  priority: level2Status;
  status: level3Status;
  deadline:string;
}

export interface SingleTaskRecordInterface {
  className?: string;
  unique:{
    name:string[];
    priority:string[];
    status:string[];
  }
  data: SingleTaskSampleInterface[];
}

// interface recordTypes {
//   data:[],
  
// }


export interface GoalSampleInterface {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  prizeAmount: number;
  importanceLevel: level5Status;
  difficultyLevel: level5Status;
  currentStatus:level4Status;
}

export interface GoalRecordInterface {
  className?: string;
  data: GoalSampleInterface[];
  unique:{
    goal_status:string[];
    goal_level:string[];
  }
}