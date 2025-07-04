import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '@/modules/auth/services/auth.service';
import { RegisterData, Token, LoginData } from '@/modules/auth/types/auth.interfaces';
import { fetchCurrentUserThunk } from '../../user/thunk/user.thunk';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from '@/modules/core/services/firebase';

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (userData: RegisterData, { dispatch, rejectWithValue }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, userData.email, userData.password!);
      const token = await user.user.getIdToken();
      
      const response: Token = await register({
        ...userData,
        provider: "password",
        token: token,
        verify_email: user.user.emailVerified
      });
      await dispatch(fetchCurrentUserThunk()).unwrap();
      
      return response;
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        return rejectWithValue('INVALID_CREDENTIALS');
      }

      if (error.code === 'auth/invalid-email') {
        return rejectWithValue('INVALID_EMAIL');
      }

      if (error.code === 'auth/email-already-in-use') {
        return rejectWithValue('EMAIL_ALREADY_REGISTERED');
      }
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export const signupWithProviderThunk = createAsyncThunk(
  'auth/signupWithGoogle',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await signInWithPopup(auth, provider);
      const token = await user.user.getIdToken();

      const response: Token = await register({
        email: user.user.email ?? '',
        provider: "google",
        token: token,
        full_name: user.user.displayName ?? '',
        username: user.user.displayName ?? '',
        verify_email: user.user.emailVerified
      });

      await dispatch(fetchCurrentUserThunk()).unwrap();
      return response;
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        return rejectWithValue('INVALID_CREDENTIALS');
      }
      return rejectWithValue(error.response.data.detail);
    }
  }
)

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginData.username, loginData.password);
      const token = await user.user.getIdToken();
      const response: Token = await login(token);
      await dispatch(fetchCurrentUserThunk()).unwrap();
      return response;
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        return rejectWithValue('INVALID_CREDENTIALS');
      }
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export const loginWithProviderThunk = createAsyncThunk(
  'auth/loginWithProvider',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await signInWithPopup(auth, provider);
      const token = await user.user.getIdToken();
      const response: Token = await login(token);
      await dispatch(fetchCurrentUserThunk()).unwrap();
      return response;
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        return rejectWithValue('INVALID_CREDENTIALS');
      }
      return rejectWithValue(error.response.data.detail);
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    
    await signOut(auth).catch((error) => {
      console.error(error);
    });

    return true;
  }
)