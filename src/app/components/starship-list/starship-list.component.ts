import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsService } from '../../services/star-wars.service';
import { Starship } from '../../interfaces/starship';

@Component({
  standalone: true,
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss'],
  imports: [CommonModule],
})
export class StarshipListComponent implements OnInit {
  starships = signal<Starship[]>([]); 
  isLoading = signal(false); 
  noMoreData = signal(false); 
  defaultImage = 'assets/star1.jpeg'; 

  constructor(private starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.loadMore(); 
  }

  loadMore(): void {
    if (this.isLoading() || this.noMoreData()) return; 

    this.isLoading.set(true);

    this.starWarsService.getStarships().subscribe({
      next: (response) => {
        const currentStarships = this.starships();
        this.starships.set([...currentStarships, ...response.results]);

        if (!response.next) {
          this.noMoreData.set(true); 
        }
      },
      error: (error) => {
        console.error('Error al cargar más naves:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  getStarshipImageUrl(url: string): string {
    return this.starWarsService.getStarshipImageUrl(url);
  }
}
