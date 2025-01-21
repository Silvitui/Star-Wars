import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsService } from '../../services/star-wars.service';
import { Observable, forkJoin } from 'rxjs';
import { Film } from '../../interfaces/film';

@Component({
  standalone: true,
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  imports: [CommonModule]
})
export class FilmsComponent implements OnInit {
  private starwarsService = inject(StarWarsService);
  @Input() filmUrls: string[] = []; 
  films: Film[] = [];

  ngOnInit(): void {
    if (this.filmUrls.length > 0) {
      const filmRequests = this.filmUrls.map(url => this.starwarsService.getFilmByUrl(url));
      forkJoin(filmRequests).subscribe(filmData => {
        this.films = filmData;
      });
    }
  }
}
