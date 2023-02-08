import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledDetailsComponent } from './enrolled-details.component';

describe('EnrolledDetailsComponent', () => {
  let component: EnrolledDetailsComponent;
  let fixture: ComponentFixture<EnrolledDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
