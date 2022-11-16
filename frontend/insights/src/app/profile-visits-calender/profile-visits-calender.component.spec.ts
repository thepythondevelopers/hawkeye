import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitsCalenderComponent } from './profile-visits-calender.component';

describe('ProfileVisitsCalenderComponent', () => {
  let component: ProfileVisitsCalenderComponent;
  let fixture: ComponentFixture<ProfileVisitsCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVisitsCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileVisitsCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
