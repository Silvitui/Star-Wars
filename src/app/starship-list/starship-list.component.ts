import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../services/star-wars.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  imports: [CommonModule,RouterModule],
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {
  starships!: typeof this.starWarsService.starships;
  totalPages!: typeof this.starWarsService.totalPages;
  currentPage!: typeof this.starWarsService.currentPage;

  constructor(public starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.starships = this.starWarsService.starships;
    this.totalPages = this.starWarsService.totalPages;
    this.currentPage = this.starWarsService.currentPage;

    this.loadPage(1);
  }

  loadPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.starWarsService.loadStarships(page);
    }
  }
}
