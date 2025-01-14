import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio('assets/Starwars.mp3');
  isPlaying = false;
  isManuallyPaused: any;

  playMusic(): void {
    this.audio.play();
    this.isPlaying = true;
    this.isManuallyPaused = false; 
  }

  pauseMusic(): void {
    this.audio.pause();
    this.isPlaying = false;
  }
}