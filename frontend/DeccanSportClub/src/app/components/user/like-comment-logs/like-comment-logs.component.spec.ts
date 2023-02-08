import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeCommentLogsComponent } from './like-comment-logs.component';

describe('LikeCommentLogsComponent', () => {
  let component: LikeCommentLogsComponent;
  let fixture: ComponentFixture<LikeCommentLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeCommentLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeCommentLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
