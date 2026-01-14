
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
export interface User {
  name: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};