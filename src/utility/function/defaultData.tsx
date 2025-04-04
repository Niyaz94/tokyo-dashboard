import dayjs                  from 'dayjs';
import { SleepFormStateInterface } from '../../utility/types/Page';


export const sleepFormIntialState:SleepFormStateInterface = {
  id: 0,
  bedTime: dayjs(),
  approxFellSleepTime: null,
  morningWakingUp: '09:00:00',
  SleepState: '',
  morningFeeling: '',
  daily: 0,
  whatYouThink: '{}',
  sleepNotes: '{}',
  dayTimeSleepInMinutes: 0,
  peeCountDuringNight: 0,
  approxWakingNum: 0
};

export const TaskStatusFormIntialState = {
  id: 0,
  task:0,
  date: dayjs(),
  status: '',
  note: '{}',
  isTodaySTask: false,
  spendingTime: 0,
};