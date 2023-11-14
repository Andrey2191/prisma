import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMails = createAsyncThunk('inbox/fetchMails', async ({ id, query, view}) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/inbox/mails`, {
            params: {
                query,
                view,
            }
        })
        console.log(response.data.mails);
        return response.data.mails

    } catch (error) {
        throw error
    }
})

export const fetchMessage = createAsyncThunk('inbox/fetchMessage', async ({ id, threadId, messageId }) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/inbox/mail?threadId=${threadId}&messageId=${messageId}`);
        console.log(response.data);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        // GET
            .addCase(fetchMails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMails.fulfilled, (state, action) => {
                state.loading = false;
                // state.mails = action.payload;
                state.mails = Array.isArray(action.payload) ? action.payload : [];
                console.log('Mails updated:', state.mails);
            })
            .addCase(fetchMails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                
            })
            .addCase(fetchMessage.fulfilled, (state, action) => {
                state.selectedMessage = action.payload; 
            });
    },
});

export default inboxSlice.reducer;