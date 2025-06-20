import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, loginWithProviderThunk, logoutThunk, signupThunk, signupWithProviderThunk } from './thunk/auth.thunk';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
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
    })
    .addCase(signupThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(loginThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(loginThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(signupWithProviderThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(signupWithProviderThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(loginWithProviderThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(loginWithProviderThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(logoutThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer; 