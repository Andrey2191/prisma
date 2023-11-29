import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogs = createAsyncThunk('logs/fetchLogs', async () => {
  try {
    const response = await axios.get('https://plifal.tech/api/accounts/log');
    return response.data.logs;
  } catch (error) {
    throw error;
  }
});

const logsSlice = createSlice({
  name: 'logs',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
})

export default logsSlice.reducer;