import { TestBed } from '@angular/core/testing';
import { StarWarsService } from './star-wars.service';
import { provideHttpClient, HttpClient } from '@angular/common/http';

describe('StarWarsService', () => {
  let service: StarWarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StarWarsService,
        provideHttpClient(), 
      ],
    });

    service = TestBed.inject(StarWarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
