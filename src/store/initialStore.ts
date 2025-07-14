import { AuthState, BookState, tableState,tablePaginationInterface,CartState,titleState,dailyInitialStateInterface} from '../utility/types/typeStore';



export const tablePaginationInit: tablePaginationInterface[] = [
  { name: "expense",page: 0, limit: 10 },
  { name: "today",page: 0, limit: 10 },
  { name: "tomorrow",page: 0, limit: 10 },
  { name: "activity",page: 0, limit: 10 },
  { name: "sleep"  ,page: 0, limit: 10 },
  { name: "taskStatus"  ,page: 0, limit: 10 },
  { name: "singleTask"  ,page: 0, limit: 10 },
  { name: "singleTaskType"  ,page: 0, limit: 10 },
  { name: "expenseType"  ,page: 0, limit: 10 },
  { name: "task"  ,page: 0, limit: 10 },
  { name: "goal"  ,page: 0, limit: 10 },
  { name: "topic"  ,page: 0, limit: 10 },

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