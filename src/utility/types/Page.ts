
import dayjs                     from 'dayjs';

export type SleepFormStateInterface = {
  id: number;
  bedTime: dayjs.Dayjs;
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
};

export type TaskStatusFormStateInterface = {
  id: number;
  task:number;
  date: string | null; // DONE
  status: string;
  note: string; // DONE
  isTodaySTask: boolean; // DONE
  spendingTime: number; // DONE
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

export type TodayFormIntialStateInterface = {
  id: number;
  date: string;
  worryingLevel: string;
  infoConsumptionLevel: string;
  isBusyDay: boolean;
  isMeditation: boolean;
  isSuccessfulDay: boolean;
  dailyNotes: string;
  whatToDoBetter: string;
  usefulTimeInMinutes: number;
  wastedTimeInMinutes: number;
  successRate: number;
};

export type TomorrowFormIntialStateInterface = {
  id: number;
  date: string;
  hasPlan: boolean;
  tomorrowNotes: string;
  daily: number;
};     