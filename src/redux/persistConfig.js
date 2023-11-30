import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'accounts', 'tasks'],
};

export const persistedReducer = (reducer) => persistReducer(persistConfig, reducer);