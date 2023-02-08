import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempMessageComponent } from './temp-message.component';

describe('TempMessageComponent', () => {
  let component: TempMessageComponent;
  let fixture: ComponentFixture<TempMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
