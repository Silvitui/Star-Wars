import { Component } from '@angular/core';
import { OpeningStarwarsComponent } from "../opening-starwars/opening-starwars.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  imports: [OpeningStarwarsComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
