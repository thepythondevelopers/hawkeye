import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfollwersComponent } from './newfollwers.component';

describe('NewfollwersComponent', () => {
  let component: NewfollwersComponent;
  let fixture: ComponentFixture<NewfollwersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfollwersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewfollwersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
