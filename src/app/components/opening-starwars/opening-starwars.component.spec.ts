import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpeningStarwarsComponent } from './opening-starwars.component';
import { AudioService } from '../../services/audioservice.service';

describe('OpeningStarwarsComponent', () => {
  let component: OpeningStarwarsComponent;
  let fixture: ComponentFixture<OpeningStarwarsComponent>;
  let audioServiceSpy: jasmine.SpyObj<AudioService>;

  beforeEach(async () => {
    audioServiceSpy = jasmine.createSpyObj('AudioService', ['playMusic', 'pauseMusic'], {
      isPlaying: false,
      isManuallyPaused: false,
    });

    await TestBed.configureTestingModule({
      declarations: [OpeningStarwarsComponent],
      providers: [{ provide: AudioService, useValue: audioServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningStarwarsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call playmusic on AudioService when playmusic is executed', () => {
    component.playMusic();
    expect(audioServiceSpy.playMusic).toHaveBeenCalled();
    expect(audioServiceSpy.isManuallyPaused).toBeFalse();
  });

  it('should call pausemusic on AudioService when pausemusic is executed', () => {
    component.pauseMusic();
    expect(audioServiceSpy.pauseMusic).toHaveBeenCalled();
    expect(audioServiceSpy.isManuallyPaused).toBeTrue();
  });

  it('should play music on mousemove if not manually paused and not already playing', () => {
    audioServiceSpy.isPlaying = false;
    audioServiceSpy.isManuallyPaused = false;

    component.onMouseMove();

    expect(audioServiceSpy.playMusic).toHaveBeenCalled();
  });

  it('should not play music on mousemove if is manually paused', () => {
    audioServiceSpy.isPlaying = false;
    audioServiceSpy.isManuallyPaused = true;

    component.onMouseMove();

    expect(audioServiceSpy.playMusic).not.toHaveBeenCalled();
  });

  it('should no play music on mousemove if already playing', () => {
    audioServiceSpy.isPlaying = true;
    audioServiceSpy.isManuallyPaused = false;
    component.onMouseMove();
    expect(audioServiceSpy.playMusic).not.toHaveBeenCalled();
  });
});