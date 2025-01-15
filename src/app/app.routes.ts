
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { OpeningStarwarsComponent } from './components/opening-starwars/opening-starwars.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, 
        children: [
          { path: '', component: OpeningStarwarsComponent }, 
          { path: 'starships', component: StarshipListComponent } 
        ]
      },
      { path: '**', redirectTo: '' } 
    ];