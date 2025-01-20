import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterOutlet], // ✅ Solo los necesarios
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
