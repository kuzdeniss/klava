export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: number;
  email: string;
}
