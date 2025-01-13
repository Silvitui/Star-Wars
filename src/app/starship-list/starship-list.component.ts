import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../services/star-wars.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Starship } from '../interfaces/starship';

@Component({
  standalone:true,
  imports: [CommonModule,RouterModule],
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {
  starships: Starship[] = []
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(public starWarsService: StarWarsService) {}

  ngOnInit(): void {

    this.loadPage(1);
    this.starWarsService.loadStarships().then((starships: Starship[]) => {
      this.starships = starships;
    })
  }

  loadPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.starWarsService.loadStarships(page);
    }
  }
}
