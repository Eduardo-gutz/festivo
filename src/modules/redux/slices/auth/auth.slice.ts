import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, loginWithProviderThunk, logoutThunk, signupThunk, signupWithProviderThunk } from './thunk/auth.thunk';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    })
    .addCase(signupThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(loginThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      console.log("🚀 ~ auth.slice.ts:46 ~ .addCase ~ action.payload:", action.payload)
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(signupWithProviderThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    })
    .addCase(signupWithProviderThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(loginWithProviderThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    })
    .addCase(loginWithProviderThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(logoutThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    })
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer; 