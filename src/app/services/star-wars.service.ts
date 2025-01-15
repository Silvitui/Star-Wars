import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Starship, StarshipApiResponse } from '../interfaces/starship';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { People } from '../interfaces/people';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = 'https://swapi.py4e.com/api/starships';
  private currentPage = 1;

  constructor(private http: HttpClient) {}

  getStarships(page: number = this.currentPage) {
    return this.http.get<StarshipApiResponse>(`${this.apiUrl}/?page=${page}`).pipe(
      tap(() => this.currentPage++), 
      catchError((error) => {
        console.error("Error loading the starships", error);
        return throwError(() => error);
      })
    );
  }



  getStarshipImageUrl(url: string): string {
    const id = url.split('/').filter((segment) => segment).pop();
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }

  getStarshipDetails(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${this.apiUrl}/starships/${id}`);
  } 

  getPilotDetails(url: string): Observable<People> {
    return this.http.get<People>(url);
  }

  getFilmDetails(url: string): Observable<Film>{
    return this.http.get<Film>(url);
  } 
}
