import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface AdminStats {
  totalRevenue: number;
  activeUsers: number;
  pendingBookings: number;
  totalTrips: number;
}

interface StatsState {
  data: AdminStats;
  status: 'idle' | 'loading' | 'error';
}

const initialState: StatsState = {
  data: { totalRevenue: 0, activeUsers: 0, pendingBookings: 0, totalTrips: 0 },
  status: 'idle',
};

export const fetchStats = createAsyncThunk('stats/fetch', async () => {
  
  const data = await import('../../data/db.json');
  return data.adminStats as AdminStats;
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state) => { state.status = 'error'; });
  },
});

export default statsSlice.reducer;
