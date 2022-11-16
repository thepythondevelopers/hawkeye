import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteClicksInsightsComponent } from './website-clicks-insights.component';

describe('WebsiteClicksInsightsComponent', () => {
  let component: WebsiteClicksInsightsComponent;
  let fixture: ComponentFixture<WebsiteClicksInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteClicksInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteClicksInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
