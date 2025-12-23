
import dayjs, { extend }                     from 'dayjs';

export type SleepFormStateInterface = {
  id: number;
  bedTime: string;
  approxFellSleepTime: string | null;
  morningWakingUp: string;
  SleepState: string;
  morningFeeling: string;
  daily: number;
  whatYouThink: string;
  sleepNotes: string;
  dayTimeSleepInMinutes: number;
  peeCountDuringNight: number;
  approxWakingNum: number;
  isSleepControl: boolean;
  isEatDrinkBeforeSleep: boolean;
};

export type TaskStatusFormStateInterface = {
  id: number;
  task:number;
  importance_level:number;
  date: string | null; // DONE
  status: string;
  note: string; // DONE
  isTodaySTask: boolean; // DONE
  spendingTime: number; // DONE
};

export type SingleTaskFormStateInterface = {
  id: number;
  type_ids	:number[],
  deadline: string | null; // DONE
  status: string;
  note: string; // DONE
  title: string; // DONE
  priority: string; // DONE
  numPriority: number; // DONE
  expectedSpendingTime:number;
  spendingTime:number;
};




export type TaskFormStateInterface = {
  id: number;
  status: string;
  name: string; 
  tag: string; 

  goal:number;
  month:number;
  result: number;
  percentage: number;
  prizeAmount: number;
  dailyTime: number;

  description : string; 
  prizeDetail : string; 
  resultDescription : string; 
};

export type GoalFormStateInterface = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  prizeAmount: number;

  importanceLevel: string;
  difficultyLevel: string; 
  currentStatus: string; 

  goalDetail : string; 
  planToAchieved : string; 
  goalResult : string; 
  prizeDetail : string; 
}; 

export type ActivityFormIntialStateInterface = {
  id: number;
  consumeWaterInLiters: number;
  minBurnCalories: number;
  mbNumber: number;
  mbSpendingTime: number;
  eatingLevel:string;
  daily: number;
  activityLevel: string;
  activityNotes: string;
  eattingNotes: string;
  isGoingGym: boolean;
  weight: number;
};

export type CurrencyLimitFISI = {
  id: number;
  startDate: string;
  endDate: string;
  amount: number;
  note: string;
  currency: number;
};

export type TransactionFormIntialStateInterface = {
  id: number;
  date: string;
  amount: number;
  note: string;
  currency: number;
  category: number;
};

export interface LimitFormIntialStateInterface extends TransactionFormIntialStateInterface{
  default: boolean;
}

export interface ExpenseFormIntialStateInterface extends TransactionFormIntialStateInterface{
  consider: boolean;
  wastedAmount: number;
  spendingType: string;
}
export interface IncomeFormIntialStateInterface extends TransactionFormIntialStateInterface{
  consider: boolean;
}
export interface LoanFormIntialStateInterface extends TransactionFormIntialStateInterface{
  consider: boolean;
  expectedReturnDate: string;
}

export type SingleTaskTypeFormIntialStateInterface = {
  id: number;
  name: string;
  description: string;
};

export type TaskMonthFormIntialStateInterface = {
  id: number;
  name: string;
  year: string;
};

export type CategoryTypeFormIntialStateInterface = {
  id: number;
  name: string;
  note: string;
  category: string;
};

export type CurrencyFormIntialStateInterface = {
  id: number;
  name: string;
  note: string;
  startDay: number;
  maxAmount: number;
};

export type TodayFormIntialStateInterface = {
  id: number;
  date: string;
  worryingLevel: string;
  infoConsumptionLevel: string;
  isBusyDay: boolean;
  isMeditation: boolean;
  // isSuccessfulDay: boolean;
  successStatus: string;
  dailyNotes: string;
  whatToDoBetter: string;
  dailyThink: string;
  usefulTimeInMinutes: number;
  wastedTimeInMinutes: number;
  successRate: number;
  isListenToMusic: boolean;
  beingGrateful: boolean;
};

export type TomorrowFormIntialStateInterface = {
  id: number;
  date: string;
  hasPlan: boolean;
  tomorrowNotes: string;
  daily: number;
};  

export type TopicFormIntialStateInterface = {
  id: number;
  date: string;
  deadline: string;
  type: number | null;
  notes: string;
  status: string;
  title: string;
  image: File[];
  url_image: string[];
  priority: number;

};  
export type IdeaFormIntialStateInterface = {
  id: number;
  deadline: string;
  type: number | null;
  status: string;
  successRate: number;
  name: string;
  detail: string;
  howToAchieved: string;
};  

export type PageTypeFormIntialStateInterface = {
  id: number;
  notes: string;
  name: string;
}; 

export type RecipeFormIntialStateInterface = {
  id: number;
  date: string;
  notes: string;
  delicious: string;
  title: string;
};  


export type DocumentFormIRF = {
  id: number;
  type_ids	:number[],
  secrecy_level: string;
  notes: string; 
  title: string;
  image: File[];
  url_image: string[];
};