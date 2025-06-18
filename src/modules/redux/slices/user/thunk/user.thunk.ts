import { getCurrentUser } from "@/modules/auth/services/user.service";
import { setUser } from "../user.slice";
import { User } from "@/modules/auth/types/user.interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUserThunk = createAsyncThunk(
    'user/fetchCurrent',
    async (_, { dispatch }) => {
      try {
        const userData: User = await getCurrentUser();
        return userData;
      } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Error al obtener datos del usuario');
      }
    }
  );
  