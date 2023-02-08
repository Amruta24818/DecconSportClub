import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
//import { ValidPassService  } from 'src/app/services/valid-pass.service'
@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss'],
})
export class AddManagerComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toastrSer: NotificationService,
    private router: Router,
    private userService: UserService
  ) {}
  status = false;
  addManager: any;

  ngOnInit(): void {
    this.addManager = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"),
        ])
      ),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.passwordMatch,
      ]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bloodGrp: new FormControl('', [Validators.required]),
      age: new FormControl(0, [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  passwordMatch(control: AbstractControl) {
    let paswd = control.root.get('confirmPassword');
    console.log(paswd);
    if (paswd && control.value != paswd.value) {
      return {
        passwordMatch: false,
      };
    }
    return null;
  }
  file: any;
  loading: boolean = false; // Flag variable
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  registerManager() {
    this.status = true;
    console.log(this.addManager.value);
    this.adminService.addManager(this.addManager).subscribe((res) => {
      console.log(res);

      console.log(this.file);
      this.adminService
        .uploadProfileImg(this.file, res.userId)
        .subscribe((res) => {
          console.log(res);
          this.loading = false;
        });

      this.router.navigate(['/admin/manager-details']);
    });
  }
  getEmailErrorMessage() {
    return this.addManager.hasError('required')
      ? 'You must enter a value'
      : this.addManager.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  public errorHandling = (control: string, error: string) => {
    return this.addManager.controls[control].hasError(error);
  };

  account_validation_messages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Minimum 5 characters' },
      { type: 'pattern', message: 'Your password must be Alphanumric' },
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' },
    ],
    mobile:[
      {type: 'required', message: 'Mobile is required'},
      {type: 'pattern', message: 'Enter 10 digit Mobile Number'}
    ],
    address:[
      {type: 'required', message: 'Address is required'}
    ],
    bloodGrp:[
      {type: 'required', message: 'Blood Group is required'}
    ],
    age:[
      {type: 'required', message: 'Age is required'},
      {type: 'pattern', message: 'Age Range between 0 to 100'}
    ],
    gender:[
      {type: 'required', message: 'Gender is required'}
    ]
  };

  checkUserName() {
    this.userService
      .getUserByUserName(this.addManager.value.userName)
      .subscribe(
        (res) => {
          this.toastrSer.showError('Username already exists', '');
        },
        (error) => {
          this.toastrSer.showSuccess('Username available', '');
        }
      );
  }
  checkUserEmail() {
    this.userService.getUserByEmail(this.addManager.value.email).subscribe(
      (res) => {
        //user exists: valid email
        this.toastrSer.showError('Email Id already exists', '');
      },
      (error) => {
        //user does not exists: invalid email
        this.toastrSer.showSuccess('Email Id available', '');
      }
    );
  }
}
