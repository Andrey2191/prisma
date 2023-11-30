import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedReducer } from './persistConfig';
import fileReducer from './reducers/fileUploadReducer';
import accountsSlice from './slice/accountsSlice';
import inboxSlice from './slice/inboxSlice';
import tasksSlice from './slice/tasksSlice';
import authSlice from './slice/authSlice';
import logsSlice from './slice/logsSlice';
import inboxQuerySlice from './slice/inboxQuerySlice';

const rootReducer = combineReducers({
  auth: authSlice,
  uploadedFile: fileReducer,
  accounts: accountsSlice,
  inbox: inboxSlice,
  tasks: tasksSlice,
  logs: logsSlice,
  query: inboxQuerySlice
});

const persistedRootReducer = persistedReducer(rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store);

export { store, persistor };