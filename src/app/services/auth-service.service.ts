import { Injectable, inject } from '@angular/core';
import {Auth, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider,onAuthStateChanged} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, Login, AuthResponse } from '../interfaces/users'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private user: Observable<User | null>;

  constructor() {
    this.user = new Observable((observer) => {
      onAuthStateChanged(this.auth, (fbUser) => {
        if (fbUser) {

          observer.next({
            fullName: fbUser.displayName || "",
            email: fbUser.email || "",
            password: ""
          }); 
        } else {  

          observer.next(null);
        }
      });
    });
  }

  register(user: User): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, user.email, user.password)).pipe(
      map((userCredential) => ({
        email: userCredential.user.email || "",
        fullName: user.fullName, 
        password: "" 
      })),
      catchError((error) => {
        let errorMessage = "Something went wrong. Please try again.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered. Try logging instead.";
        }

        return throwError(() => new Error(errorMessage)); 
      })
    );
  }
  login(credentials: Login): Observable<AuthResponse> {
    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map((userCredential) => ({
        user: {
          email: userCredential.user.email || '',
          id: userCredential.user.uid
        }
      })),
      catchError((error) => {
        let errorMessage = 'Something went wrong. Please try again.';
        switch (error.code) {
          case 'auth/invalid-credential': 
            errorMessage = 'Invalid email or password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            errorMessage = `Unexpected error: ${error.message}`;
            break;
        }
  
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  loginWithGoogle(): Observable<AuthResponse> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((userCredential) => ({
        user: {
          email: userCredential.user.email || '',
          id: userCredential.user.uid
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
}
