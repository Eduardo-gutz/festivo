import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupThunk } from './thunk/auth.thunk';

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
    setCredentials: (state, action: PayloadAction<{ user: any }>) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(signupThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(signupThunk.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer; 