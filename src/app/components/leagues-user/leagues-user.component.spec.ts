import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesUserComponent } from './leagues-user.component';

describe('LeaguesUserComponent', () => {
  let component: LeaguesUserComponent;
  let fixture: ComponentFixture<LeaguesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaguesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
