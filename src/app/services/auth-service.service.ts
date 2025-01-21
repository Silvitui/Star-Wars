import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, Login, AuthResponse } from '../interfaces/users'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private user: Observable<User | null>;

  constructor() {
    this.user = new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          observer.next({ fullName: user.displayName || '', email: user.email || '', password: '' }); 
        } else {
          observer.next(null);
        }
      });
    });
  }


  register(user: User): Observable<AuthResponse> {
    return from(createUserWithEmailAndPassword(this.auth, user.email, user.password)).pipe(
      map((userCredential) => ({
        accessToken: '',
        user: {
          email: userCredential.user.email || '',
          id: userCredential.user.uid.length, 
        }
      })),
      catchError((error) => {
        console.error('Error en el registro:', error);
        throw error;
      })
    );
  }

 
  login(credentials: Login): Observable<AuthResponse> {
    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map((userCredential) => ({
        accessToken: '',
        user: {
          email: userCredential.user.email || '',
          id: userCredential.user.uid.length, 
        }
      })),
      catchError((error) => {
        console.error('Error en el login:', error);
        throw error;
      })
    );
  }


  loginWithGoogle(): Observable<AuthResponse> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((userCredential) => ({
        accessToken: '',
        user: {
          email: userCredential.user.email || '',
          id: userCredential.user.uid.length,
        }
      })),
      catchError((error) => {
        console.error('Error en Google Sign-In:', error);
        throw error;
      })
    );
  }


  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((error) => {
        console.error('Error en el logout:', error);
        throw error;
      })
    );
  }

  get currentUser(): Observable<User | null> {
    return this.user;
  }

  async getToken(): Promise<string | null> {
    if (!this.auth.currentUser) return null;
    return await this.auth.currentUser.getIdToken();
  }
}
