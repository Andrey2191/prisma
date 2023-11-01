import {  combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import fileReducer from './reducers/fileUploadReducer';
import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './slice/accountsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  uploadedFile: fileReducer,
  accounts: accountsSlice
});

// const store = createStore(rootReducer);

const store = configureStore({
  reducer: rootReducer
})

export default store;