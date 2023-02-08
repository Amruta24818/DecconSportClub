import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRenewMembershipComponent } from './apply-renew-membership.component';

describe('ApplyRenewMembershipComponent', () => {
  let component: ApplyRenewMembershipComponent;
  let fixture: ComponentFixture<ApplyRenewMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyRenewMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyRenewMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
