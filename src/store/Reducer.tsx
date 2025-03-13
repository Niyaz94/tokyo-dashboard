import { combineReducers,ThunkAction,Action} from '@reduxjs/toolkit';

import counterReducer from './slice/counter';
import tableReducer   from './slice/table';
import bookReducer    from './slice/book';
import cartReducer    from './slice/cart';
import titleReducer   from './slice/title';
import loginSlice     from './slice/login';
import dailySlice     from './slice/daily';

const rootReducer = combineReducers({
  counter :counterReducer,
  table   :tableReducer,
  books   :bookReducer,
  cart    :cartReducer,
  title   :titleReducer,
  auth    :loginSlice,
  daily   :dailySlice
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default rootReducer;

