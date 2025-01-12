import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Starship, StarshipApiResponse } from '../interfaces/starship';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private apiUrl = 'https://swapi.dev/api/starships';

  starships = signal<Starship[]>([]);
  totalPages = signal<number>(0);

  constructor(private http: HttpClient) {}


  loadStarships(page: number = 1): void {
    this.http.get<StarshipApiResponse>(`${this.apiUrl}/?page=${page}`).subscribe({
      next: (response) => {
        this.starships.set(response.results); 
        this.totalPages.set(Math.ceil(response.count / 10)); 
      },
      error: (err) => {
        console.error('Error fetching starships:', err);
      }
    });
  }

  getStarshipImageUrl(url: string): string {
    const id = url.split('/').filter(segment => segment).pop();
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }
}
 