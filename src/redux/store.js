import {  combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import fileReducer from './reducers/fileUploadReducer';
import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './slice/accountsSlice';
import inboxSlice from './slice/inboxSlice';
import tasksSlice from './slice/tasksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  uploadedFile: fileReducer,
  accounts: accountsSlice,
  inbox: inboxSlice,
  tasks: tasksSlice
});

const store = configureStore({
  reducer: rootReducer
})

export default store;