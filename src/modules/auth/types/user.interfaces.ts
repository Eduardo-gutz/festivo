// Interfaces para el servicio de usuarios

export enum Role {
  USER = 'user',
  PUBLISHER = 'publisher',
  ADMIN = 'admin'
}

export enum Provider {
  PASSWORD = 'password',
  GOOGLE = 'google'
}

export interface User {
  _id?: string;
  username: string;
  full_name: string;
  avatar?: string;
  email: string;
  uid?: string;
  provider?: Provider;
  created_at: number;
  verify_email: boolean;
  role: Role;
}

export interface UpdateUserData {
  full_name?: string;
  email?: string;
  username?: string;
  avatar?: string;
} 