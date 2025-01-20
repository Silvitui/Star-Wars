import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StarWarsService } from '../../services/star-wars.service';
import { Starship } from '../../interfaces/starship';

@Component({
  standalone: true,
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class StarshipDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private starwarsService = inject(StarWarsService);

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
}
