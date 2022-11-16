import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpostCalenderComponent } from './newpost-calender.component';

describe('NewpostCalenderComponent', () => {
  let component: NewpostCalenderComponent;
  let fixture: ComponentFixture<NewpostCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpostCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpostCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
