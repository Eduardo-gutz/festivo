import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/modules/auth/types/user.interfaces';
import { loginThunk, signupThunk } from '../auth/thunk/auth.thunk';
import { fetchCurrentUserThunk } from './thunk/user.thunk';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCurrentUserThunk.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.error.message || 'Error al obtener datos del usuario';
    });
    builder.addCase(fetchCurrentUserThunk.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { setUser, clearUser, setUserLoading, setUserError } = userSlice.actions;

export default userSlice.reducer; 