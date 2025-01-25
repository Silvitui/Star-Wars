import { Component, HostListener, inject } from '@angular/core';
import { AudioService } from '../../services/audioservice.service'; 

@Component({
  selector: 'app-opening-starwars',
  templateUrl: './opening-starwars.component.html',
  styleUrls: ['./opening-starwars.component.scss'],
})
export class OpeningStarwarsComponent {
  private audioService = inject(AudioService); 

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(): void {
    if (!this.audioService.isManuallyPaused && !this.audioService.isPlaying) {
      this.audioService.playMusic();
    }
  }

  playMusic(): void {
    this.audioService.isManuallyPaused = false; 
    this.audioService.playMusic();
  }

  pauseMusic(): void {
    this.audioService.isManuallyPaused = true; 
    this.audioService.pauseMusic();
  }
}
