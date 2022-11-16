import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachCalenderComponent } from './reach-calender.component';

describe('ReachCalenderComponent', () => {
  let component: ReachCalenderComponent;
  let fixture: ComponentFixture<ReachCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReachCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReachCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
