import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  user: string;
  destination: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
}

interface BookingsState {
  items: Booking[];
  status: 'idle' | 'loading' | 'error';
}

const initialState: BookingsState = {
  items: [],
  status: 'idle',
};

export const fetchBookings = createAsyncThunk('bookings/fetch', async () => {
  
  const data = await import('../../data/db.json');
  return data.bookings as Booking[];
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state) => { state.status = 'error'; });
  },
});

export default bookingsSlice.reducer;
