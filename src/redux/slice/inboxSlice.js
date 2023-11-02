import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMails = createAsyncThunk('inbox/fetchMails', async ({id}) => {
    try {
        const response = await axios.get(`https://plifal.tech/api/accounts/${id}/inbox/mails?`)
        console.log(response.data.mails);
        return response.data.mails

    } catch (error) {
        throw error
    }
})

const inboxSlice = createSlice({
    name: 'inbox',
    initialState: {
        mails: [],
        loading: false,
        error: null,
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
                state.mails = action.payload;
            })
            .addCase(fetchMails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default inboxSlice.reducer;