import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsService } from '../../services/star-wars.service';
import { Starship } from '../../interfaces/starship';

@Component({
  standalone: true,
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss'],
  imports: [CommonModule]
})
export class StarshipListComponent implements OnInit {
  starships = signal<Starship[]>([]);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  defaultImage = 'assets/star1.jpeg'; 

  constructor(private starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  loadPage(page: number): void {
    this.starWarsService.getStarships(page).subscribe({
      next: (response) => {
        this.starships.set(response.results);
        this.totalPages.set(Math.ceil(response.count / 10));
        this.currentPage.set(page);
      },
      error: (error) => {
        console.error('Error al cargar datos de Starships:', error);
      }
    });
  }
  getImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return this.defaultImage; 
    }
    return imageUrl 
  }

  getStarshipImageUrl(url: string): string {
    return this.starWarsService.getStarshipImageUrl(url);
  }

  

  
}
