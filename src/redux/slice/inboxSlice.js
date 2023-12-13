import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMails = createAsyncThunk('inbox/fetchMails', async ({ id, query, view }) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/inbox/mails`, {
            params: {
                query,
                view,
            }
        })
        
        return response.data.mails

    } catch (error) {
        throw error
    }
})

export const fetchMessage = createAsyncThunk('inbox/fetchMessage', async ({ id, threadId, messageId }) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/inbox/mail?threadId=${threadId}&messageId=${messageId}`);
        console.log(response.data.body);
        return response.data.body;
    } catch (error) {
        throw error;
    }
});

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {
        mails: [],
        loading: false,
        error: null,
        selectedMessage: null,
    },
    reducers: {
        resetSelectedMessage: (state) => {
            state.selectedMessage = null;
        },
        resetMails: (state) => {
            state.mails = []
        }
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchMails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMails.fulfilled, (state, action) => {
                state.loading = false;
                state.mails = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchMails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            })
            .addCase(fetchMessage.fulfilled, (state, action) => {
                state.selectedMessage = action.payload;
                state.loading = false;
            })
            .addCase(fetchMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            })
    },
});

export const { resetSelectedMessage, resetMails } = inboxSlice.actions;

export default inboxSlice.reducer;