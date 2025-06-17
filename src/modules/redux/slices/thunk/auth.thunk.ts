import { createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '@/modules/auth/services/auth.service';
import { RegisterData, Token } from '@/modules/auth/types/auth.interfaces';

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (userData: RegisterData) => {
    try {
      const response: Token = await register(userData);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.detail);
    }
  }
);
