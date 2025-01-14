import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { OpeningStarwarsComponent } from './components/opening-starwars/opening-starwars.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, // Home principal
        children: [
          { path: '', component: OpeningStarwarsComponent }, // Carrusel por defecto
          { path: 'starships', component: StarshipListComponent } // Lista de Starships
        ]
      },
      { path: '**', redirectTo: '' } // Redirige rutas no válidas al Home
    ];