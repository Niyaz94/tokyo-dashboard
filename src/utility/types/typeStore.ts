import {TEXT_PARAGRAPH} from "./typeApp"

export interface Book {
    id: number;
    title: string;
    price: number;
    quantity: number;
}
export interface BookState {
    books: Book[];
}
interface CartItem extends Book {
    quantityInCart: number;
}
export interface CartState {
    items: CartItem[];
    discount: number;
}

export interface CounterState {
    value: number;
}


export interface TableRow {
    id: number;
    fullname: string;
    location: string;
    age: number;
    is_admin:boolean;
}
  
export interface tableState {
    data: TableRow[];
}


export interface indTitle {
    key:string;
    title:string;
    content:string;
}
  
export interface titleState {
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
    data:indTitle[];
}

export interface singleTitle{
    id:string;
    content:TEXT_PARAGRAPH;
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: string | null; // Replace 'any' with your user type
    isLoading: boolean;
    error: string | null;
  }


export interface dailySingleInterface {
    value:number|string;
    label:string;
}
export interface dailyInitialStateInterface {
    data: dailySingleInterface[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
