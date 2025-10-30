import dayjs                  from 'dayjs';
import { SleepFormStateInterface } from '../../utility/types/Page';
import { max } from 'date-fns';


export const sleepFormIntialState:SleepFormStateInterface = {
  id: 0,
  // bedTime: dayjs(),
  bedTime: dayjs().format('HH:mm:ss'),
  approxFellSleepTime: null,
  morningWakingUp: '09:00:00',
  SleepState: '',
  morningFeeling: '',
  daily: 0,
  whatYouThink: '{}',
  sleepNotes: '{}',
  dayTimeSleepInMinutes: 0,
  peeCountDuringNight: 0,
  approxWakingNum: 0,
  isSleepControl:false,
  isEatDrinkBeforeSleep: true
};

export const TaskStatusFormIntialState = {
  id: 0,
  task:0,
  date: dayjs().format('YYYY-MM-DD'),
  status: '',
  note: '{}',
  isTodaySTask: false,
  spendingTime: 0,
};

export const SingleTaskFormIntialState = {
  id: 0,
  type_ids	:[],
  deadline: dayjs().endOf('month').format('YYYY-MM-DD'),
  status: '',
  note: '{}',
  title: '',
  priority: '',
  numPriority: 0,
  expectedSpendingTime:0,
  spendingTime:0
};


export const TaskFormIntialState = {
  id: 0,
  status: '',
  name: '', 
  tag: '', 

  goal:0,
  month:0,

  result: 0,
  percentage: 0,
  prizeAmount: 0,
  dailyTime: 0,

  description : '{}', 
  prizeDetail : '{}', 
  resultDescription : '{}' 
};

export const GoalFormIntialState = {
  id: 0,

  title: '',
  prizeAmount: 0,
  importanceLevel: '',
  difficultyLevel: '',
  currentStatus: '',

  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().format('YYYY-MM-DD'),


  goalDetail : '{}', 
  planToAchieved : '{}', 
  goalResult : '{}' ,
  prizeDetail : '{}' 
};



export const ActivityFormIntialState = {
  id: 0,
  consumeWaterInLiters: 0,
  minBurnCalories: 0,
  mbNumber: 0,
  mbSpendingTime: 0,
  eatingLevel:'',
  daily: 0,
  activityLevel: '',
  activityNotes: '{}',
  eattingNotes: '{}',
  isGoingGym: false,
  weight: 0,
};

export const TransactionFormIntialState = {
  id: 0,
  date: dayjs().format('YYYY-MM-DD'),
  amount: 0,
  note: '{}',
  currency: 0,
  category: 0
};

export const ExpenseFormIntialState = {
  ...TransactionFormIntialState,
  consider: false,
  wastedAmount: 0,
  spendingType: 'necessity'
};

export const IncomeFormIntialState = {
  ...TransactionFormIntialState,
  consider: false
};
export const LoanFormIntialState = {
  ...TransactionFormIntialState,
  consider: false,
  expectedReturnDate: dayjs().add(1,'year').format('YYYY-MM-DD')
};

export const limitFormIntialState = {
  ...TransactionFormIntialState,
  default: false
};

export const SingleTaskTypeFormIntialState = {
  id: 0,
  name: "",
  description: '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
};
export const TaskMonthFormIntialState = {
  id: 0,
  name: "",
  year: dayjs().format('YYYY')
};

export const CategoryTypeFormIntialState = {
  id: 0,
  name: "",
  category:"expense",
  note: ''
};

export const CurrencyFormIntialState = {
  id: 0,
  name: "",
  note: '',
  startDay: 1,
  maxAmount: 0
};


export const todayFormIntialState = {
  id: 0,
  date: dayjs().format('YYYY-MM-DD'),
  worryingLevel: '',
  infoConsumptionLevel: '',
  isBusyDay: false,
  isMeditation: false,
  // isSuccessfulDay: false,
  successStatus: "neutral",
  isListenToMusic: false,
  dailyNotes: '{}',
  whatToDoBetter: '{}',
  dailyThink: '{}',
  usefulTimeInMinutes: 0,
  wastedTimeInMinutes: 0,
  successRate: 50,
  beingGrateful: false
};

export const TomorrowFormIntialStateInterface = {
  id: 0,
  daily: null,
  date: dayjs().add(1, "day").format('YYYY-MM-DD'),
  hasPlan: false,
  tomorrowNotes: '{}'
};

export const TopicFormIntialState = {
  id: 0,
  date: dayjs().format('YYYY-MM-DD'),
  deadline: dayjs().endOf('month').format('YYYY-MM-DD'),
  type: null,
  notes: '{}',
  status: '',
  title: '',
  image: []
};

export const TopicTypeFormIntialState = {
  id: 0,
  name: '',
  notes: '{}'
};

export const RecipeFormIntialStateInterface = {
  id: 0,
  date: dayjs().format('YYYY-MM-DD'),
  notes: '{}',
  delicious: '',
  title: '',
};
