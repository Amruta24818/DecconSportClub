import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss'],
})
export class UserDashComponent implements OnInit {
  pendingBatches: any[] = [];
  enrolledBatches: any[] = [];
  rejectedBatches: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserEnrolledSports().subscribe((res) => {
      if (res !== null) {
        this.enrolledBatches = res;
      }
    });
    this.userService.getUserPendingBatches().subscribe((res) => {
      if (res !== null) {
        this.pendingBatches = res;
      }
    });
    this.userService.getUserRejectedBatches().subscribe((res) => {
      if (res !== null) {
        this.rejectedBatches = res;
      }
    });
  }
}
