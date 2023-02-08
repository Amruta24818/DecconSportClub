import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any;
  private data = decryptData(sessionStorage['user']);
  userId: number = this.data.userId;

  constructor(
    private fb: FormBuilder,

    private _activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  passwordMatch(control: AbstractControl) {
    let paswd = control.root.get('new_password');
    console.log(paswd);
    if (paswd && control.value != paswd.value) {
      return {
        passwordMatch: false,
      };
    }
    return null;
  }

  changePassword(value: any) {
    console.log(value);
    if (this.changePasswordForm.valid) {
      console.log('Change password form valid');
    }
    this.editPassword(this.userId, value.new_password);
  }
  editPassword(userId: number, newPassword: string) {
    console.log(userId + ' ' + newPassword);
    this.userService.editPassword(userId, newPassword).subscribe((res) => {
      console.log(res);
    });
    this.router.navigateByUrl('/profile-dets');
  }
  ngOnInit(): void {
    this.userId = this._activatedRoute.snapshot.params['id'];
    this.changePasswordForm = this.fb.group({
      old_password: [null, Validators.required],
      new_password: [null, Validators.required],
      confirm_new_password: [null, [Validators.required, this.passwordMatch]],
    });
  }
}
