export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string;
} 