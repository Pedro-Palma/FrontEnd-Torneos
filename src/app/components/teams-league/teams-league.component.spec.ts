import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsLeagueComponent } from './teams-league.component';

describe('TeamsLeagueComponent', () => {
  let component: TeamsLeagueComponent;
  let fixture: ComponentFixture<TeamsLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
