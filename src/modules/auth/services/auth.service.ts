import apiClient from '../../core/services/api';
import { RegisterData, Token } from '../types/auth.interfaces';

export async function login(token: string): Promise<Token> {
  const response = await apiClient.post<Token>('/auth/login/token', {
    token
  });
  
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
  }
  return response.data;
}

export async function register(data: RegisterData): Promise<Token> {
  const response = await apiClient.post<Token>('/auth/register', data);

  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
  }
  return response.data;
}

export async function refreshToken(): Promise<Token> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await apiClient.post<Token>('/auth/refresh', { refresh_token: refreshToken });
  
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
  }
  return response.data;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
} 