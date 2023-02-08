import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent implements OnInit {
  constructor(
    private fb: FormBuilder,

    private _activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  email: any;
  changePasswordForm: any;
  ngOnInit(): void {
    this.email = this._activatedRoute.snapshot.params['email'];
    this.changePasswordForm = this.fb.group({
      new_password: [null, Validators.required],
      confirm_new_password: [null, [Validators.required, this.passwordMatch]],
    });
  }

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
      console.log('forget password form valid');
    }
    this.forgetPass(value.new_password);
  }
  forgetPass(newPassword: string) {
    this.userService
      .forgetPassword(this.email, newPassword)
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigateByUrl('/login');
  }
}
