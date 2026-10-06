export interface AuthUser {
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  token: string;
}
