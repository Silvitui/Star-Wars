import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StarshipListComponent } from './starship-list/starship-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página principal
    { path: 'starships', loadComponent: () => import('./starship-list/starship-list.component').then(c => c.StarshipListComponent) },

    { path: '**', redirectTo: '' }, // Redirección a Home si no encuentra la ruta
];
