import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const readFile = async (file) => {
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
      console.log(response.data.task);
      return response.data.task;
    } catch (error) {
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

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async ({id}) => {
  try {
      const response = await axios.delete(`https://plifal.tech/api/account?id=${id}`);
      return response.data.accounts;
  } catch (error) {
      throw error;
  }
});

export const deleteAllAccounts = createAsyncThunk('accounts/deleteAllAccounts', async () => {
  try {
      const response = await axios.delete(`https://plifal.tech/api/accounts`);
      return response.data.accounts;
  } catch (error) {
      throw error;
  }
});

const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        data: [],
        loading: false,
        error: null,
        starredAccounts: [],
    },
    reducers: {
      addToStarred: (state, action) => {
        const accountId = action.payload;
        // Проверяем, есть ли аккаунт в списке звездных
        const isStarred = state.starredAccounts.includes(accountId);
        // Если аккаунт уже в списке звездных, удаляем его, иначе добавляем
        if (isStarred) {
          state.starredAccounts = state.starredAccounts.filter(id => id !== accountId);
        } else {
          state.starredAccounts.push(accountId);
        }
      },
    },
    extraReducers: (builder) => {
        builder
        // POST
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
        // PUT
            .addCase(fetchAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
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
              state.data =  action.payload;
          })
          .addCase(deleteAllAccounts.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          });
    },
});

export const { addToStarred } = accountsSlice.actions;

export default accountsSlice.reducer;