export interface User {
    fullName: string;
    email: string;
    password: string;
  }
  
  export interface Login {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    accessToken: string;
    user: {
      email: string;
      id: number;
    };
  }
  