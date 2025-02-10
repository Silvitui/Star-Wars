import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsService } from '../../services/star-wars.service';
import { Observable, forkJoin } from 'rxjs';
import { People } from '../../interfaces/people';

@Component({
  standalone: true,
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss'],
  imports: [CommonModule]
})
export class PilotsComponent implements OnInit {
  starwarsService = inject(StarWarsService);
  @Input() pilotUrls: string[] = []; 
  pilots: People[] = [];
  
  ngOnInit(): void {
    if (this.pilotUrls.length > 0) {
      const pilotRequests = this.pilotUrls.map(url => this.starwarsService.getPilotByUrl(url));
      forkJoin(pilotRequests).subscribe(pilotData => {
        this.pilots = pilotData;
      });
    }
  }
}
