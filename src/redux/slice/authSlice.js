import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://plifal.tech/api/login', formData);
    const sessionToken = response.data.session_token
    const isAuthenticated = response.data.isAuthenticated
    localStorage.setItem('sessionToken', sessionToken);
    sessionStorage.setItem('sessionToken', sessionToken);
        axios.defaults.headers.common['Authorization'] = `${sessionToken}`;
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  isAuthenticated: Boolean(sessionStorage.getItem('sessionToken')),
  sessionToken: sessionStorage.getItem('sessionToken'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.sessionToken = null;
      sessionStorage.removeItem('sessionToken');
      localStorage.removeItem('sessionToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.sessionToken = action.payload.session_token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.sessionToken = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;