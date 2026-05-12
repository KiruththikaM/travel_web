import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  user: string;
  destination: string;
  destinationName: string;
  destinationImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
}

interface BookingsState {
  items: Booking[];
  status: 'idle' | 'loading' | 'error';
}

const ALL_BOOKINGS_KEY = 'all_bookings';

function loadFromStorage(): Booking[] {
  try {
    const raw = localStorage.getItem(ALL_BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: Booking[]) {
  localStorage.setItem(ALL_BOOKINGS_KEY, JSON.stringify(items));
}

const initialState: BookingsState = {
  items: [],
  status: 'idle',
};

export const fetchBookings = createAsyncThunk('bookings/fetch', async () => {
  const stored = loadFromStorage();
  if (stored.length > 0) return stored;

  
  const data = await import('../../data/db.json');
  const seeded: Booking[] = (data.bookings as any[]).map(b => ({
    id: b.id,
    user: b.user,
    destination: b.destination,
    destinationName: b.destination,
    destinationImage: '',
    location: b.destination,
    checkIn: b.date,
    checkOut: b.date,
    guests: 2,
    date: b.date,
    status: b.status,
    price: b.price,
  }));
  saveToStorage(seeded);
  return seeded;
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<Booking>) {
      state.items.unshift(action.payload);
      saveToStorage(state.items);
    },
    updateBookingStatus(state, action: PayloadAction<{ id: string; status: Booking['status'] }>) {
      const booking = state.items.find(b => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
        saveToStorage(state.items);
      }
    },
  },
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

export const { addBooking, updateBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
