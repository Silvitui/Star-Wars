import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilotsComponent } from './pilots.component';
import { StarWarsService } from '../../services/star-wars.service';
import { of, throwError } from 'rxjs';
import { People } from '../../interfaces/people';
import { CommonModule } from '@angular/common';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;
  let starWarsServiceSpy: jasmine.SpyObj<StarWarsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StarWarsService', ['getPilotByUrl']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, PilotsComponent],
      providers: [{ provide: StarWarsService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    starWarsServiceSpy = TestBed.inject(StarWarsService) as jasmine.SpyObj<StarWarsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle API errors and continue with valid pilots', () => {
    const mockPilots: People[] = [
      { 
        name: 'Luke Skywalker', birth_year: '19BBY', eye_color: 'blue',
        gender: 'male', hair_color: 'blond', height: 172, mass: '77', skin_color: 'fair',
        homeworld: 'Tatooine', species: [], films: [], starships: [], vehicles: [],
        url: 'url1', created: '', edited: '', imageUrl: 'luke.jpg' 
      }
    ];

    component.pilotUrls = ['url1', 'url2']; 

    starWarsServiceSpy.getPilotByUrl.and.returnValues(
      of(mockPilots[0]), 
      throwError(() => new Error('Error cargando piloto')) 
    );

    component.ngOnInit();
    expect(starWarsServiceSpy.getPilotByUrl).toHaveBeenCalledTimes(2);
    expect(component.pilots.length).toBe(1);
    expect(component.pilots[0].name).toBe('Luke Skywalker');
  });
});
