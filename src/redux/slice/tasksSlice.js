import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAccount } from './accountsSlice';

export const fetchTasks = createAsyncThunk('accounts/fetchTasks', async () => {
    try {
        const response = await axios.put('https://plifal.tech/api/tasks');
        return response.data.tasks;
    } catch (error) {
        throw error;
    }
});

export const fetchDrive = createAsyncThunk('inbox/fetchMails', async ({id}) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/drive/link`)
        console.log(response.data.task);
        return response.data.task

    } catch (error) {
        throw error
    }
})
export const fetchPhotos = createAsyncThunk('inbox/fetchPhotos', async ({id}) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/photos/link`)
        console.log(response.data.task);
        return response.data.task

    } catch (error) {
        throw error
    }
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // PUT
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // get
            .addCase(fetchDrive.fulfilled, (state, action) => {
                state.data.push(action.payload);
              })
              .addCase(fetchDrive.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchDrive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              })
              .addCase(createAccount.fulfilled, (state, action) => {
                state.data.push(action.payload);
              })
              .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.data.push(action.payload);
              })
    },
});

export default tasksSlice.reducer;