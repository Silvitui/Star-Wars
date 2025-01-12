import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Starship, StarshipApiResponse } from '../interfaces/starship';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = 'https://swapi.py4e.com/api/starships';
  starships = signal<Starship[]>([]);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);

  constructor(private http: HttpClient) {}

  loadStarships(page: number = 1): void {
    this.http.get<StarshipApiResponse>(`${this.apiUrl}/?page=${page}`).subscribe({
      next: (response) => {
        console.log('Datos cargados:', response);
        this.starships.set(response.results);
        this.totalPages.set(Math.ceil(response.count / 10));
      },
      error: (err) => {
        console.error('Error al obtener los datos:', err);
      },
    });
  }

  getStarshipImageUrl(url: string): string {
    const id = url.split('/').filter((segment) => segment).pop();
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }
}
