import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { decryptData, encryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  counter: number = 300;
  status: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastrSer: NotificationService
  ) {
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      //  console.log(this.counter)
      if (this.counter === 0) {
        console.log('otp removed from session storage');
        sessionStorage.removeItem('otp');
        clearInterval(intervalId);
      }
    }, 1000);
  }

  //private data = sessionStorage['user']; //not stored yet
  email: string = sessionStorage['email'];

  sendOtp(email: string) {
    if (this.switch === 'OTP') {
      this.userService.getOtp(email).subscribe((res) => {
        sessionStorage['otp'] = res;
        console.log(res);
      });
    } else {
      this.userService
        .forgetOtp(this.getEmail.value.forgetValue)
        .subscribe((res) => {
          sessionStorage['otp'] = res;
          console.log(res);
        });
    }
  }

  validate() {
    if (sessionStorage.getItem('otp') === this.inputOtp.value.otpValue) {
      console.log('valid');

      if (this.switch === 'OTP') {
        this.userService.getUserToken(this.email).subscribe((response: any) => {
          // if the status is success then get data
          if (response['status'] == 'success') {
            //  const data = response['data'];

            if (localStorage['remember'] ) {
              localStorage['token'] = response['token'];
              localStorage['user'] = encryptData(response['data']);
            }

            // cache the user info in session storage
            sessionStorage['token'] = response['token'];
            sessionStorage['user'] = encryptData(response['data']);

            sessionStorage.removeItem('email');

            sessionStorage.removeItem('otp');
            // if role is manager -> manager-dash
            this.router.navigate(['/homepage']);
            // if role is user -> user-dash
          }
          // if there is some error then do following action
          else {
            console.log('Failed while getting the token... ');
          }
        });

      } else {
        sessionStorage.removeItem('otp');
        this.router.navigate(['/forget-pass/' + this.email]);
      }
    } else {
      console.log('invalid OTP');
    }
  }

  inputOtp: any;
  getEmail: any;
  switch: any;
  ngOnInit(): void {
    this.switch = this._activatedRoute.snapshot.params['switch'];

    if (this.switch === 'OTP') {
      this.status = 'OTP';
    } else {
      this.status = 'FORGETPASS';
    }

    this.inputOtp = new FormGroup({
      otpValue: new FormControl(''),
    });

    this.getEmail = new FormGroup({
      forgetValue: new FormControl(''),
    });
  }

  resetPass() {
    //  console.log(this.getEmail.value.forgetValue);
    this.email = this.getEmail.value.forgetValue;



  this.userService.getUserByEmail(this.email).subscribe(res=>{
    //user exists: valid email

    this.sendOtp(this.email);
    this.status = 'OTP';
  },error=>{
    //user does not exists: invalid email
    this.toastrSer.showError("Please enter registered email","Invalid Email");
  })


  }
}
