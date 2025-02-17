export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export type level1Status = "VERY_LOW" |  "LOW" |  "NORMAL" |  "HIGH" |  "VERY_HIGH"


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
