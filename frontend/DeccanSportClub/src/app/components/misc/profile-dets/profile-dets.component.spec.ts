import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetsComponent } from './profile-dets.component';

describe('ProfileDetsComponent', () => {
  let component: ProfileDetsComponent;
  let fixture: ComponentFixture<ProfileDetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
