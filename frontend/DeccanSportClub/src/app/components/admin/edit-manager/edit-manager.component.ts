import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.scss'],
})
export class EditManagerComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {}

  managerId: any;
  manager: any;
  addManager: any;
  ngOnInit(): void {
    this.managerId = this._activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.managerId).subscribe((res) => {
      this.manager = res;
      console.log(this.manager);
      this.addManager = new FormGroup({
        userId: new FormControl(this.manager.userId),
        userName: new FormControl(this.manager.userName),
        name: new FormControl(this.manager.name),
        email: new FormControl(this.manager.email),
        mobile: new FormControl(this.manager.mobile),
        address: new FormControl(this.manager.address),
        sportsName: new FormControl(this.manager.sportsName),
        password: new FormControl(this.manager.password),
        bloodGrp: new FormControl(this.manager.bloodGrp),
        age: new FormControl(this.manager.age),
        gender: new FormControl(this.manager.gender),
        userTimestamp: new FormControl(this.manager.userTimestamp),
        loginAttempt: new FormControl(this.manager.loginAttempt),
        userRole: new FormControl(this.managerId.userRole),
      });
      this.addManager.controls['managerId'].disable();
      this.addManager.controls['userName'].disable();
      this.addManager.controls['email'].disable();
    });
  }

  editManager() {
    this.adminService.editManager(this.addManager).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/admin/manager-details');
    },
    (error) => {
      this.ngOnInit();
    }
    );
  }
}
