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
    user: {
      email: string;
      id: string;
    };
  }
  