import { ReactNode }          from 'react';


export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export type level1Status = "VERY_LOW" |  "LOW" |  "NORMAL" |  "HIGH" |  "VERY_HIGH"
export type level2Status =   "LOW" |  "NORMAL" |  "HIGH" 
export type level3Status =   "ACHIEVED" |  "POSTPONED" |  "INPROGRESS" | "COMPLETED" | "HALF_COMPLETED" | "NOT_STARTED" | "FAILED" | "FOLLOWUP"
export type level4Status =  "ACHIEVED" | "POSTPONED" | "INPROGRESS" | "COMPLETED" | "UNCOMPLETED"
export type level5Status =   "LESS" |  "NORMAL" |  "VERY" 

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';




export interface TemplatePropsInterface {
  children?: ReactNode;
  templateTitle: string;
}

export interface CryptoOrder {
  id: string;
  currency_name: string;
  expense_type: string;
  date: string;
  amount: number;
  note: string;
  status: CryptoOrderStatus;

}

export interface SleepRowSampleInterface {
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
  data: SleepRowSampleInterface[];
}

export interface Filters {
  status?: level1Status; // it is an interface that accept three string values
}



export interface ActivitySingleSampleInterface {
  id: number;
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
  mbNumber: number;
  mbSpendingTime: number;
}

export interface RecentActivityTableInterface {
  data: ActivitySingleSampleInterface[];
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

export interface GoalUniqueInterface {
    goal_status:level4Status[];
    goal_level:level5Status[];
}


export interface TaskRowSampleInterface {
  id: string;
  task_month: string;
  task_year: number;
  task_date:string;
  name: string;
  prizeAmount: number;
  percentage: number;
  result:number;
  status:string;
  dailyTime:number;
  month:number;
  goal:number;
  goal_detail:{
    title: string;
    start_date: string;
    end_date : string;
    status: level4Status;
    difficulty: level5Status;
    importance: level5Status;
  }
}

export interface TaskUniqueInterface extends GoalUniqueInterface {
    years:string[];
    months:Record<number, string> ;
}

export interface ExpenseUniqueInterface {
    type:string[];
    currency:string[];
}

export interface TaskStatusRowSampleInterface {
  id: string;
  date: string;
  note: string[];
  spendingTime:number;
  status: string;
  task_name: string;
  isTodaySTask:boolean;
  task_detail:{
    status : string;
    goal_name: string;
    prizeAmount: number;
    percentage: number;
    result: number;
  }
}

export interface SingleTaskRowSampleInterface {
  id: string;
  date: string;
  type_name: string;
  title:string;
  description: string[];
  priority: level2Status;
  type: number;
  deadline:string;
  status: string; 
}


export interface TaskStatusUniqueInterface {
    tasks_name:string[];
    task_status:string[];
    task_tags:string[];
}
export interface TaskStatusRecordInterface {
  data: TaskStatusRowSampleInterface[];
  unique:TaskStatusUniqueInterface
}
export interface TaskStatusContextInterface {
  table: TaskStatusRowSampleInterface[];
  setTable: (val: TaskStatusRowSampleInterface[]) => void;
  secondary: TaskStatusUniqueInterface;
  setSecondary: (val: {}) => void;
}

export interface PaginationTableDataInterface<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}


export interface TomorrowSingleSampleInterface {
  id: number;
  date: string;
  daily: number|null;
  isBusyDay: boolean;
  succssRate: number;
  isMeditation: boolean;
  usefulTimeInMinutes: number;
  wastedTimeInMinutes: number;
  hasPlan: boolean;
}

export interface RecentTomorrowTableInterface {
  data: TomorrowSingleSampleInterface[];
}

export interface TopicSingleSampleInterface {
  id: string;
  date: string;
  title: string;
  updated_at: string;
  stutus: level3Status;
}

export interface RecipeSingleSampleInterface {
  id: string;
  date: string;
  title: string;
  updated_at: string;
  delicious: level5Status;
}

export interface DailySingleSampleInterface {
  id: number;
  date: string;
  isBusyDay: boolean;
  isMeditation: boolean;
  isSuccessfulDay: boolean;
  worryingLevel: level1Status;
  infoConsumptionLevel: level2Status;
  usefulTimeInMinutes: number;
  wastedTimeInMinutes: number;
  successRate: number;
  activity: {
      isGoingGym: boolean;
      weight: number;
      mbNumber: number;
  } | null;
  sleep: {
      SleepState: level1Status;
      bedTime: string;
      approxFellSleepTime: string;
      morningWakingUp: string;
      dayTimeSleepInMinutes: number;
  } | null;
}

export interface RecentDailyTableInterface {
  data: DailySingleSampleInterface[];
}


export interface ExpenseUniqueInterface {
  type:string[];
  currency:string[];
}
export interface ExpenseSingleSampleInterface {
  id: string;
  date: string;
  note: string;
  amount: number;
  expense_type:string;
  deadline:string;
}

export interface RecentExpenseTableInterface {
  data: ExpenseSingleSampleInterface[];
  unique:ExpenseUniqueInterface;
}

export interface SingleTaskUniqueInterface {
  type:string[];
  status:string[];
  priority:string[];
}

export interface SingleTaskTypeSingleSampleInterface {
  id: number;
  description: string;
  name: string;
  total_completed: number;
  total_inprogress: number;
  total_notstarted: number;
  total_others: number;
}

export interface CurrencyeSingleSampleInterface {
  id: number;
  note: string;
  name: string;
}


export interface ExpenseTypeSSInterface {
  id: number;
  note: string;
  name: string;

  total: number;
  older_total: number;
  last_month_total: number;
  current_month_total: number;
  two_months_ago_total: number;

  older_count: number;
  total_count: number;
  last_month_count : number;
  current_month_count : number;
  two_months_ago_count: number;
}

export interface Column {
  label: string;
  align?: 'left' | 'right' | 'center';
  id:string;
  key?: string; // optional: for auto-rendering if needed
}