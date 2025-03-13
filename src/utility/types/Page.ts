
import dayjs                     from 'dayjs';

export type FormStateInterface = {
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