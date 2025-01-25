import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Login } from '../interfaces/users'; 
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, RouterModule],
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Login = { email: '', password: '' };
  errorMessage = '';
  returnUrl: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  loginForm: any;
  ngOnInit() {
  const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) {
      this.returnUrl = returnUrl;
    }
  }
  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: (error) => {
        this.errorMessage = 'Error logging in with Google';
      },
    });
  }

  goBack() {
    this.router.navigate(['/']);  
  }
}
