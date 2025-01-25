import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsService } from '../../services/star-wars.service';
import { Starship } from '../../interfaces/starship';
import { Router, RouterLink } from '@angular/router';




@Component({
  standalone: true,
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss'],
  imports: [CommonModule, InfiniteScrollDirective],
})
export class StarshipListComponent implements OnInit {
  private starwarsService = inject(StarWarsService);
  private router = inject(Router);
  public starships: Starship[] = [];
  public currentPage = 1;
  public isLoading = false;
  public hasMoreData = true; 

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    this.loadStarships();
  }

  loadStarships(): void {
    if (this.isLoading || !this.hasMoreData) return;

    this.isLoading = true;

    this.starwarsService.getStarships(this.currentPage).subscribe({
      next: (data) => {
        if (data.results.length === 0) {
          this.hasMoreData = false; 
        } else {
          this.starships = [...this.starships, ...data.results]; 
          this.currentPage++; 
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching starships:', error);
        this.isLoading = false;
      },
    });
  }

  onScroll(): void {
    this.loadStarships();
  }

  goToDetails(id: string): void {
    this.router.navigate(['starships', id]);
  }
}
