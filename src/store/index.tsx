import { configureStore } from '@reduxjs/toolkit';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './Reducer';


const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
// persistor.pause();
// persistor.flush().then(() => {
//   return persistor.purge();
// });


export type AppDispatch = typeof store.dispatch
export { store, persistor };