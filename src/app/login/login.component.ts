
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Login } from '../interfaces/users'; 
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule,RouterModule],
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: Login = { email: '', password: '' };
  errorMessage = '';
  returnUrl: string = '/starships';


  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Error al iniciar sesión.';
      },
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: (error) => {
        console.error('Error en Google Sign-In:', error);
        this.errorMessage = 'Error al iniciar sesión con Google.';
      },
    });
  }
  goBack() {
    this.router.navigate(['/']);  
  }
}
