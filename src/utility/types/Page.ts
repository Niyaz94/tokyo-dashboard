
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
  date: dayjs.Dayjs | null; // DONE
  status: string;
  note: string; // DONE
  isTodaySTask: boolean; // DONE
  spendingTime: number; // DONE
};