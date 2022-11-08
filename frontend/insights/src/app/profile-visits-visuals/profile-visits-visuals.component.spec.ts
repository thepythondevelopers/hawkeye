import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVisitsVisualsComponent } from './profile-visits-visuals.component';

describe('ProfileVisitsVisualsComponent', () => {
  let component: ProfileVisitsVisualsComponent;
  let fixture: ComponentFixture<ProfileVisitsVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVisitsVisualsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileVisitsVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
