import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { encryptData, decryptData } from 'src/app/utilities/config';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private adminService: AdminService,
    private toastrSer: NotificationService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private announcer:LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.announcer.announce("Hello World","assertive");
    // at the start check wether token and user data is avaliable in session
    // if it is present then navigate the client to perticular dash acc to his role
    if (localStorage['token'] && localStorage['user']) {
      const data_2 = decryptData(localStorage['user']);
      //handling account locking in remember me
      this.userService.getUserToken(data_2.email).subscribe((response: any) => {
        if (response['status'] == 'success') {
          //  const data = response['data'];
            localStorage['token'] = response['token'];
            localStorage['user'] = encryptData(response['data']);
            const data = decryptData(localStorage['user']);
            console.log(data.loginAttempt)
            if(data.loginAttempt>3){
              this.toastrSer.showError("Account is locked", '');
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              this.router.navigate(["/homepage"]);
            }
            sessionStorage['token'] = localStorage['token'];
            sessionStorage['user'] = localStorage['user'];
        }
      
      });
    
    
    }

    if (sessionStorage['token'] && sessionStorage['user']) {
      this.navigate(sessionStorage['token']);
    }

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
  aFormGroup: any;
  siteKey:string="6LdbEF8dAAAAADjOIGK2k9_k8VVhHljuCt-zn5QM";
  email: string = '';
  password: string = '';
  remember_me: boolean = false;
  loginError: boolean = false;
  data: any;

  LoginErrorMessage(message: any) {
    this.toastrSer.showError(message, '');
  }

  onLogin() {
    this.loginService.login(this.email, this.password).subscribe(
      (response: any) => {
        // if the status is success then get data
        if (response['status'] == 'success') {
          this.data = response['data'];

          // cache the user info in session storage
          if (this.remember_me) {
            // localStorage['token'] = response['token'];
            // localStorage['user'] = encryptData(response['data']);
            localStorage['remember'] = true;
          }
          //saving user and token in session storage after OTP validation
          //  sessionStorage['token'] = response['token'];
          //  sessionStorage['user'] = encryptData(response['data']);

          sessionStorage['email'] = this.data.email;
          // goto the dashboard
          this.navigate_old(response['token']);
        }
        // if there is some error then do following action
      },

      (error) => {
        console.log(error.status);
        if (error.status === 403) {
          this.LoginErrorMessage('Invalid Credentials');
        }
        if (error.status === 423) {
          this.LoginErrorMessage('Account has been Locked!');
        }

        if (error.status === 0) {
          this.LoginErrorMessage('Server is unreachable');
        }
      }
    );
  }

  // redirect to home if user is already logged in
  navigate(token: string) {
    this.toster.success('Logged in Successfully');
    this.router.navigate(['/']);
  }

  navigate_old(token: string) {
    // get user data from session

    //console.log(data);

    // if role is admin -> admin-dash
    if (this.data.userRole == 'ADMIN') {
      sessionStorage['token'] = token;
      sessionStorage['user'] = encryptData(this.data);
      if(localStorage['remember']){
        localStorage['token'] = token;
        localStorage['user'] = encryptData(this.data);
      }
      this.router.navigateByUrl('/homepage');
    }
    // if role is manager -> manager-dash
    else if (this.data.userRole == 'MANAGER') {
      sessionStorage['token'] = token;
      sessionStorage['user'] = encryptData(this.data);
      if(localStorage['remember']){
        localStorage['token'] = token;
        localStorage['user'] = encryptData(this.data);
      }
      this.router.navigateByUrl('/homepage');
    }
    // if role is user -> user-dash
    else {
      this.userService.getOtp(this.email).subscribe((res) => {
        sessionStorage['otp'] = res;
        console.log(res);
      });
      this.router.navigate(['/otp/OTP']);
    }
  }

  rememberMe(event: any) {
    if (event.target.checked) {
      this.remember_me = true;
    } else {
      this.remember_me = false;
    }
    console.log(this.remember_me);
  }
}
