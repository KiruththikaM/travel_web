import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import destinationsReducer from './slices/destinationsSlice';
import bookingsReducer from './slices/bookingsSlice';
import usersReducer from './slices/usersSlice';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    bookings: bookingsReducer,
    users: usersReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
