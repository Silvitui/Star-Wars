import { Component, HostListener } from '@angular/core';
import { AudioService } from '../services/audioservice.service'; // Importa tu servicio de audio

@Component({
  selector: 'app-opening-starwars',
  templateUrl: './opening-starwars.component.html',
  styleUrls: ['./opening-starwars.component.scss'],
})
export class OpeningStarwarsComponent {
  constructor(private audioService: AudioService) {}

  // Detectar movimiento del ratón para reproducir música automáticamente
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(): void {
    if (!this.audioService.isManuallyPaused && !this.audioService.isPlaying) {
      this.audioService.playMusic();
    }
  }

  // Métodos para interactuar con los controles de música
  playMusic(): void {
    this.audioService.playMusic();
  }

  pauseMusic(): void {
    this.audioService.pauseMusic();
  }
}
