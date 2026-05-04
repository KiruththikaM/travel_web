import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersState {
  items: AdminUser[];
  status: 'idle' | 'loading' | 'error';
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  
  const data = await import('../../data/db.json');
  return data.users as AdminUser[];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => { state.status = 'error'; });
  },
});

export default usersSlice.reducer;
