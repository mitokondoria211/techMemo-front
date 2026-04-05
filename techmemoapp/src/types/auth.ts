export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: ({ email, password }: LoginType) => Promise<void>;
  logout: () => void;
  signUp: ({ name, email, password }: RegisterType) => Promise<void>;
}
