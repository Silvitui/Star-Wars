import { Component, OnInit, signal } from '@angular/core';
import { StarWarsService } from '../services/star-wars.service';
import { Starship } from '../interfaces/starship';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {
 starships = signal([] as Starship[]); 
  totalPages = signal(0); 
  currentPage = signal(1); 

  constructor(private starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.loadPage(1); 
  }

  loadPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page); 
      this.starWarsService.loadStarships(page);  
    }
  }
}
