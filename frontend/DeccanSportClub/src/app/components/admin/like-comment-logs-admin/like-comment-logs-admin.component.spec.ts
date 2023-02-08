import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeCommentLogsAdminComponent } from './like-comment-logs-admin.component';

describe('LikeCommentLogsAdminComponent', () => {
  let component: LikeCommentLogsAdminComponent;
  let fixture: ComponentFixture<LikeCommentLogsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeCommentLogsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeCommentLogsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
