import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      resolve(e.target.result);
    };

    fileReader.onerror = function (e) {
      reject(e.target.error);
    };

    fileReader.readAsText(file);
  });
};

export const createAccount = createAsyncThunk('accounts/createAccount', async (file) => {
  try {
    const fileContent = await readFile(file);
    const response = await axios.post('https://plifal.tech/api/accounts/', {
      file_name: file.name,
      cookies: fileContent,
    });
    return response.data.task;
  } catch (error) {
    throw error;
  }
});

export const createBulkAccounts = createAsyncThunk('accounts/createBulkAccounts', async (files) => {
  try {
    const filesArray = Array.from(files);
    const requests = filesArray.map(async (file) => {
      const fileContent = await readFile(file);
      return {
        file_name: file.name,
        cookies: fileContent,
      };
    });
    const accountsData = await Promise.all(requests);
    const response = await axios.post('https://plifal.tech/api/accounts/bulk', accountsData);

    return response.data;
  } catch (error) {
    console.error('Error in createBulkAccounts:', error);
    throw error;
  }
});

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
  try {
    const response = await axios.put('https://plifal.tech/api/accounts/');
    return response.data.accounts;
  } catch (error) {
    throw error;
  }
});

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async ({ id }) => {
  try {
    const response = await axios.delete(`https://plifal.tech/api/account?id=${id}`);
    return response.data.accounts;
  } catch (error) {
    throw error;
  }
});

export const deleteAllAccounts = createAsyncThunk('accounts/deleteAllAccounts', async () => {
  try {
    const response = await axios.delete(`https://plifal.tech/api/accounts/`);
    return response.data.accounts;
  } catch (error) {
    throw error;
  }
});

export const setStarAccount = createAsyncThunk('accounts/setStarredAccount', async ({ id }) => {
  try {
    const response = await axios.post(`https://plifal.tech/api/account/star?id=${id}`);
    return response.data.account;
  } catch (error) {
    throw error;
  }
})

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    data: [],
    loading: false,
    error: null,
    starredAccounts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // POST (create single account)
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        // state.data.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // POST (create multiple accounts)
      .addCase(createBulkAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBulkAccounts.fulfilled, (state, action) => {
        state.loading = false;
        // state.data.push(...action.payload);
      })
      .addCase(createBulkAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // PUT
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.starredAccounts = [];

        state.data.forEach(account => {
          if (account.starred) {
            state.starredAccounts.push(account);
          }
        });
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(account => account.id !== action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAllAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteAllAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setStarAccount.fulfilled, (state, action) => {
        const updatedAccountIndex = state.data.findIndex(account => account.id === action.payload.id);
        if (updatedAccountIndex !== -1) {
          state.data[updatedAccountIndex].starred = true;
        }
      })
      .addCase(setStarAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToStarred } = accountsSlice.actions;

export default accountsSlice.reducer;