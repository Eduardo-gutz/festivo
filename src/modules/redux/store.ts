import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/auth/auth.slice';
import userReducer from './slices/user/user.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

