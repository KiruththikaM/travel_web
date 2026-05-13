import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Destination {
  id: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  gallery: string[];
}

interface DestinationsState {
  items: Destination[];
  status: 'idle' | 'loading' | 'error';
}

const initialState: DestinationsState = {
  items: [],
  status: 'idle',
};

export const fetchDestinations = createAsyncThunk('destinations/fetch', async () => {
  
  const data = await import('../../data/db.json');
  return data.destinations as Destination[];
});

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    addDestination: (state, action: PayloadAction<Destination>) => {
      state.items.unshift(action.payload);
    },
    updateDestination: (state, action: PayloadAction<Destination>) => {
      const index = state.items.findIndex(d => d.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteDestination: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(d => d.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state) => { state.status = 'error'; });
  },
});

export const { addDestination, updateDestination, deleteDestination } = destinationsSlice.actions;
export default destinationsSlice.reducer;
