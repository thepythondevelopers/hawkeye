import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersDetailsVisualsComponent } from './followers-details-visuals.component';

describe('FollowersDetailsVisualsComponent', () => {
  let component: FollowersDetailsVisualsComponent;
  let fixture: ComponentFixture<FollowersDetailsVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersDetailsVisualsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersDetailsVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
