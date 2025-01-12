import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-opening-starwars',
  templateUrl: './opening-starwars.component.html',
  styleUrls: ['./opening-starwars.component.scss'],
})
export class OpeningStarwarsComponent {
  @ViewChild('backgroundMusic') backgroundMusic!: ElementRef<HTMLAudioElement>;
  isMusicPlaying = false; 
  isManuallyPaused = false; 

 
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(): void {
    if (this.isManuallyPaused) {
      return;
    }

    if (!this.isMusicPlaying) {
      const audio = this.backgroundMusic.nativeElement;
      audio.play().then(() => {
        this.isMusicPlaying = true; 
      }).catch((err) => {
        console.warn("The browser blocked autoplay", err);
      });
    }
  }


  playMusic(): void {
    const audio = this.backgroundMusic.nativeElement;
    audio.play().then(() => {
      this.isMusicPlaying = true;
      this.isManuallyPaused = false; 
    }).catch((err) => {
      console.error("Error playing the music", err);
    });
  }

 
  pauseMusic(): void {
    const audio = this.backgroundMusic.nativeElement;
    audio.pause();
    this.isMusicPlaying = false; 
    this.isManuallyPaused = true; 
  }
}
