import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Starship, StarshipApiResponse } from '../interfaces/starship';
import { Observable } from 'rxjs/internal/Observable';
import { People } from '../interfaces/people';
import { Film } from '../interfaces/film';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = 'https://swapi.py4e.com/api/starships';
  starships = signal<Starship[]>([]);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);

  constructor(private http: HttpClient) {}

getStarships(page: number = 1): Observable<StarshipApiResponse> {
  return this.http.get<StarshipApiResponse>(`${this.apiUrl}/?page=${page}`).pipe(
    tap((response) => {
      this.starships.set(response.results);
      this.totalPages.set(Math.ceil(response.count / 10));
    }),
    catchError((err) => {
      console.error('Error al obtener los datos:', err);
      return throwError(() => err);
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
