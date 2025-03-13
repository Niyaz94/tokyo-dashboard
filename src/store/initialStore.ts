import { AuthState, BookState, tableState,CounterState,CartState,titleState,dailyInitialStateInterface} from '../utility/types/typeStore';



export const counterInitialState: CounterState = {
  value: 0,
};
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