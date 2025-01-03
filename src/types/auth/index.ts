export interface TokenPayload {
  id: string;
  email: string;
}

export interface User {
  _id: number;
  name: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}
