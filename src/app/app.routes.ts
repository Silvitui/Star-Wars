import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { OpeningStarwarsComponent } from './components/opening-starwars/opening-starwars.component';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: OpeningStarwarsComponent }, 
      { path: 'starships', component: StarshipListComponent, canActivate: [authGuardGuard] }, 
      { path: 'starships/:id', component: StarshipDetailsComponent, canActivate: [authGuardGuard] } 
    ]
  },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }

 
];

