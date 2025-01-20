import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Starship, StarshipApiResponse } from '../interfaces/starship';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private httpClient = inject(HttpClient); 
  private url = 'https://swapi.py4e.com/api/starships';
 

  getStarships(currentPage: number = 1): Observable<StarshipApiResponse> {
    return this.httpClient.get<StarshipApiResponse>(`${this.url}/?page=${currentPage}`).pipe(
      map(response => ({
        ...response,
        results: response.results.map((starship: Starship) => {
          const id = starship.url.split("/")[5];
          return { ...starship, id };
        })
      }))
    );
  }

  getById(id: string): Observable<Starship> {
    return this.httpClient.get<Starship>(`https://swapi.dev/api/starships/${id}/`).pipe(
      map((starship) => ({
        ...starship,
        imageUrl: `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`, 
      }))
    );
  }
  
}
