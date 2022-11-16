import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerDetailsInsightsComponent } from './follower-details-insights.component';

describe('FollowerDetailsInsightsComponent', () => {
  let component: FollowerDetailsInsightsComponent;
  let fixture: ComponentFixture<FollowerDetailsInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerDetailsInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerDetailsInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
