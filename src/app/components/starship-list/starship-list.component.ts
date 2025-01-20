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
  imports: [CommonModule, RouterLink],
})
export class StarshipListComponent implements OnInit {
  private starwarsService = inject(StarWarsService);
  private router = inject(Router); 

  starships: Starship[] = [];

  ngOnInit(): void {
    this.starwarsService.getStarships().subscribe({
      next: (data) => {
        this.starships = data.results;
        console.log('Starships:', this.starships);
      },
      error: (error) => {
        console.error('Error fetching starships:', error);
      }
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['starships', id]); 
  }
}
