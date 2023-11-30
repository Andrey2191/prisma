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

        return response.data.task

    } catch (error) {
        throw error
    }
})
export const fetchPhotos = createAsyncThunk('inbox/fetchPhotos', async ({id}) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/photos/link`)

        return response.data.task

    } catch (error) {
        throw error
    }
})
export const fetchCookies = createAsyncThunk('inbox/fetchCookies', async ({id}) => {
    try {
        const response = await axios.post(`https://plifal.tech/api/accounts/${id}/cookies`)

        return response.data.task

    } catch (error) {
        throw error
    }
})
export const fetchKeep = createAsyncThunk('inbox/fetchKeep', async ({id}) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/keep/`)

        return response.data.task

    } catch (error) {
        throw error
    }
})

export const fetchTask = createAsyncThunk('inbox/fetchTask', async ({ id }) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/task?id=${id}`);

        return response.data; 
    } catch (error) {
        throw error;
    }
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: [],
        loading: false,
        error: null,
        selectedTask: null,
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
                state.data.unshift(action.payload);
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
                state.data.unshift(action.payload);
              })
              .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
              })
              .addCase(fetchCookies.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
              })
              .addCase(fetchKeep.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
              })
              .addCase(fetchTask.fulfilled, (state, action) => {
                state.selectedTask = action.payload; 
            });
    },
});

export default tasksSlice.reducer;