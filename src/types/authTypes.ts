export interface TokenPayload {
  username: string;
  exp: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
