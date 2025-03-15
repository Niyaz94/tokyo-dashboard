import dayjs                  from 'dayjs';
import { FormStateInterface } from '../../utility/types/Page';


export const sleepFormIntialState:FormStateInterface = {
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