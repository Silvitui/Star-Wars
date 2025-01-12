import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningStarwarsComponent } from './opening-starwars.component';

describe('OpeningStarwarsComponent', () => {
  let component: OpeningStarwarsComponent;
  let fixture: ComponentFixture<OpeningStarwarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpeningStarwarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningStarwarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
