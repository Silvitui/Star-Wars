import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio('assets/Starwars.mp3');
  isPlaying = false;
  isManuallyPaused: any;

  playMusic(): void {
    this.audio.play().then(() => {
      this.isPlaying = true;
    }).catch(err => {
      console.warn("The browser blocked autoplay", err);
    });
  }

  pauseMusic(): void {
    this.audio.pause();
    this.isPlaying = false;
  }
}
