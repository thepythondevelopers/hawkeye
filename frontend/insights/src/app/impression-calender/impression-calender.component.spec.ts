import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionCalenderComponent } from './impression-calender.component';

describe('ImpressionCalenderComponent', () => {
  let component: ImpressionCalenderComponent;
  let fixture: ComponentFixture<ImpressionCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressionCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpressionCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
