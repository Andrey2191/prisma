import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInboxQuery = createAsyncThunk('query/fetchInboxQuery', async () => {
    try {
      const response = await axios.get('https://plifal.tech/api/inbox_query');
      return response.data.query;
    } catch (error) {
      throw error;
    }
});

export const createInboxQuery = createAsyncThunk('query/createInboxQuery', async (method, name, place, value) => {
    try {
      const response = await axios.post('https://plifal.tech/api/inbox_query', {
        method: method,
        name: name,
        place: place,
        value: value
      });
      return response.data.query;
    } catch (error) {
      throw error;
    }
});

export const deleteInboxQuery = createAsyncThunk('query/deleteInboxQuery', async ({ id }) => {
    try {
      const response = await axios.delete(`https://plifal.tech/api/inbox_query/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
});

export const fetchInboxResult = createAsyncThunk('query/fetchInboxResult', async ({id}) => {
    try {
      const response = await axios.get(`https://plifal.tech/api/inbox_result/${id}`);
      return response.data.mails;
    } catch (error) {
      throw error;
    }
});

const inboxQuerySlice = createSlice({
    name: 'query',
    initialState: {
      query: [],
      mails: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // GET QUERY
        .addCase(fetchInboxQuery.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchInboxQuery.fulfilled, (state, action) => {
          state.loading = false;
          state.query = action.payload;
        })
        .addCase(fetchInboxQuery.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        // CREATE QUERY
        .addCase(createInboxQuery.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createInboxQuery.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(createInboxQuery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
        //   DELETE QUERY
        .addCase(deleteInboxQuery.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteInboxQuery.fulfilled, (state, action) => {
            state.loading = false;
            // state.query = state.query.filter(query => query.id !== query.payload);
          })
          .addCase(deleteInboxQuery.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
        //   GET INBOX RESULT
        .addCase(fetchInboxResult.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchInboxResult.fulfilled, (state, action) => {
            state.loading = false;
            state.mails = action.payload;
          })
          .addCase(fetchInboxResult.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    },
  })
  
  export default inboxQuerySlice.reducer;