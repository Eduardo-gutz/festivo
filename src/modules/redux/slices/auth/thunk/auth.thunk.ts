import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '@/modules/auth/services/auth.service';
import { getCurrentUser } from '@/modules/auth/services/user.service';
import { RegisterData, Token, LoginData } from '@/modules/auth/types/auth.interfaces';
import { User } from '@/modules/auth/types/user.interfaces';
import { setUser } from '../../user/user.slice';
import { fetchCurrentUserThunk } from '../../user/thunk/user.thunk';

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (userData: RegisterData, { dispatch }) => {
    try {
      const response: Token = await register(userData);
      await dispatch(fetchCurrentUserThunk()).unwrap();
      
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { dispatch }) => {
    try {
      const response: Token = await login(loginData);
      await dispatch(fetchCurrentUserThunk()).unwrap();
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  }
);