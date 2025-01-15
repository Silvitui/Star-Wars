import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { OpeningStarwarsComponent } from "../opening-starwars/opening-starwars.component";
import { StarshipListComponent } from "../starship-list/starship-list.component";

@Component({
  imports: [HeaderComponent, RouterOutlet, OpeningStarwarsComponent, StarshipListComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detecta cambios en la ruta activa
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
