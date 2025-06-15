import apiClient from './api';
import { User, UpdateUserData } from './user.interfaces';

export async function getCurrentUser(): Promise<User> {
  try {
    const response = await apiClient.get<User>('/user/me');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const response = await apiClient.get<User>(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
  try {
    const response = await apiClient.put<User>(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await apiClient.delete(`/user/${id}`);
  } catch (error) {
    throw error;
  }
} 