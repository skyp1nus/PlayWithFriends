import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSelectionComponent } from './game-selection.component';

describe('GameSelectionComponent', () => {
  let component: GameSelectionComponent;
  let fixture: ComponentFixture<GameSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
