import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipListComponent } from './starship-list.component';
import { StarWarsService } from '../../services/star-wars.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { Starship, StarshipApiResponse } from '../../interfaces/starship';

describe('StarshipListComponent', () => {
  let component: StarshipListComponent;
  let fixture: ComponentFixture<StarshipListComponent>;
  let starWarsServiceSpy: jasmine.SpyObj<StarWarsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    starWarsServiceSpy = jasmine.createSpyObj('StarWarsService', ['getStarships']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, InfiniteScrollDirective, StarshipListComponent],
      providers: [
        { provide: StarWarsService, useValue: starWarsServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StarshipListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadStarships on ngOnInit', () => {
    spyOn(component, 'loadStarships');
    component.ngOnInit();
    expect(component.loadStarships).toHaveBeenCalled();
  });

  it('should call loadStarships when scrolled', () => {
    spyOn(component, 'loadStarships');
    component.onScroll();
    expect(component.loadStarships).toHaveBeenCalled();
  });

  it('should navigate to starship details when goToDetails is called', () => {
    component.goToDetails('123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['starships', '123']);
  });

  it('should update starships when loadStarships is called ', () => {
    const mockApiResponse: StarshipApiResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { 
          id: '1',
          name: 'X-Wing',
          model: 'T-65B',
          manufacturer: 'Incom Corporation',
          cost_in_credits: '149999',
          length: '12.5',
          crew: '1',
          passengers: '0',
          max_atmosphering_speed: '1050',
          hyperdrive_rating: '1.0',
          MGLT: '100',
          cargo_capacity: '110',
          consumables: '1 week',
          films: [],
          pilots: [],
          url: 'https://swapi.dev/api/starships/12/',
          trackById: '1', 
          starship_class: 'Starfighter', 
          created: '2024-02-01T10:00:00Z', 
          edited: '2024-02-02T12:00:00Z' 
        },
        { 
          id: '2',
          name: 'TIE Fighter',
          model: 'Twin Ion Engine',
          manufacturer: 'Sienar Fleet Systems',
          cost_in_credits: '75000',
          length: '6.4',
          crew: '1',
          passengers: '0',
          max_atmosphering_speed: '1200',
          hyperdrive_rating: 'N/A',
          MGLT: '90',
          cargo_capacity: '65',
          consumables: '2 days',
          films: [],
          pilots: [],
          url: 'https://swapi.dev/api/starships/13/',
          trackById: '2',
          starship_class: 'Starfighter', 
          created: '2024-02-01T11:00:00Z', 
          edited: '2024-02-02T13:00:00Z'
        }
      ]
    };
    starWarsServiceSpy.getStarships.and.returnValue(of(mockApiResponse));
    component.loadStarships();
    
    expect(starWarsServiceSpy.getStarships).toHaveBeenCalledWith(1);
    expect(component.starships.length).toBe(2);
    expect(component.starships[0].name).toBe('X-Wing');
  });

  it('should stop fetching more starships when api returns an empty array', () => {
    const mockApiResponse: StarshipApiResponse = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
    starWarsServiceSpy.getStarships.and.returnValue(of(mockApiResponse));
    component.loadStarships();
    expect(component.hasMoreData).toBeFalse();
  });
  it('should handle api errors gratefully', () => {
    starWarsServiceSpy.getStarships.and.throwError('api Error');
    component.loadStarships();
    expect(component.isLoading).toBeFalse();
    expect(component.starships.length).toBe(0);
  });
});