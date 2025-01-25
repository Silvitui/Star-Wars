import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth-service.service';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private auth = inject(Auth);
  private router = inject(Router);
  user: User | null = null;
  

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    signOut(this.auth).then(() => {
      this.user = null; 
      this.router.navigate(['/']);
    }).catch(error => error);
  }
  goToSignUp() {
    this.router.navigate(['/register']); 
  }
}
