import { 
  AuthState, BookState, tableState,tablePaginationInterface,CartState,titleState,dailyInitialStateInterface,
  tableHeaderFilterInterface
} from '../utility/types/typeStore';
import dayjs                  from 'dayjs';



export const tablePaginationInit: tablePaginationInterface[] = [
  { filter:{field:"id",order:"asc"},name: "expense",page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "today",page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "tomorrow",page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "activity",page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "sleep"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "taskStatus"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "singleTask"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "singleTaskType"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "expenseType"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "task"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "goal"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "topic"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "idea"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "topicType"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "ideaType"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "recipe"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "currency"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "income"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "limit"  ,page: 0, limit: 10 },
  { filter:{field:"id",order:"asc"},name: "repeat"  ,page: 0, limit: 10 },



]
export const bookInitialState: BookState = {
  books: [
    { id: 1, title: 'Book 1', price: 20, quantity: 10 },
    { id: 2, title: 'Book 2', price: 15, quantity: 15 },
  ],
};
export const cartInitialState: CartState = {
  items: [],
  discount: 0,
};

export const titleInitialState: titleState = {
  loading: 'idle',
  error: null,
  data: [],
};

export const loginInitialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
  error: null
};


export const tableInitialState :tableState = {
  data:[
    { id:1, fullname: 'John Doe',     age: 30, is_admin:false , location: 'New York' },
    { id:2, fullname: 'Jane Smith',   age: 25, is_admin:true  , location: 'Los Angeles' },
    { id:3, fullname: 'Bob Johnson',  age: 40, is_admin:false , location: 'Chicago' }
  ]
}


export const dailyInitialState:dailyInitialStateInterface = {
  data: [],
  loading: 'idle',
}

export const tableHeaderFilter:tableHeaderFilterInterface = {
  "singleTask":{status: ["all"] ,type: "all",priority: "all"},

  "taskStatus": {
    start_date: dayjs().startOf('month').format('YYYY-MM-DD') ,
    end_date: dayjs().endOf('month').format('YYYY-MM-DD'),
    status: "all",
    tag: "all"
  },
}