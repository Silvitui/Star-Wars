import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StarWarsService } from '../../services/star-wars.service';
import { Starship } from '../../interfaces/starship';
import { FilmsComponent } from "../films/films.component";
import { PilotsComponent } from "../pilots/pilots.component";

@Component({
  standalone: true,
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss'],
  imports: [CommonModule, FilmsComponent, PilotsComponent],
})
export class StarshipDetailsComponent implements OnInit {
 route = inject(ActivatedRoute);
 router = inject(Router);
starwarsService = inject(StarWarsService);

  starship: Starship | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (!id) {
      console.error("No ID found in the route");
      return;
    }

    this.starwarsService.getById(id).subscribe({
      next: (data: Starship) => {
        this.starship = data;
        console.log("Starship details:", this.starship);
      },
      error: (error) => {
        console.error("Error fetching starship details:", error);
      }
    });
  }

  goBack() {
    this.router.navigate(["/starships"]); 
  }
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/nave.jpg';
  }
  
}
