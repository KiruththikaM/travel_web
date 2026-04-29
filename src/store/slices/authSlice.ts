import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("loggedInUser") || "null"),
  isAuthenticated: !!localStorage.getItem("loggedInUser"),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
