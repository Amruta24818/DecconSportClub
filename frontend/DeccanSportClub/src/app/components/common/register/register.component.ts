import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private adminService: AdminService,
    private toastrSer: NotificationService,
    private formBuilder: FormBuilder
  ) {
   
  }

  addUser: any;
  aFormGroup: any;
  status = false;
  file: any;
  loading: boolean = false; // Flag variable
  siteKey: string = "6LdbEF8dAAAAADjOIGK2k9_k8VVhHljuCt-zn5QM";
  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.addUser = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('',Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'), //this is for the letters (both uppercase and lowercase) and numbers validation,
        Validators.maxLength(10),
     ])),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ])),
      mobile: new FormControl('',Validators.compose([
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ])),
      address: new FormControl('',[Validators.required]),
      bloodGrp: new FormControl('',[Validators.required]),
      age: new FormControl(0,Validators.compose([
        Validators.pattern("^[1-9][0-9]?$|^100$")
      ])),
      gender: new FormControl('',[Validators.required]),
    });
  }
 

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  register() {
    if(this.addUser.invalid){
      this.toastrSer.showError('All fields are required', '');
    }else{
    this.status = true;
    console.log(this.addUser.value);
    this.userService.addUser(this.addUser).subscribe((res) => {
      console.log(this.file);
      this.adminService
        .uploadProfileImg(this.file, res.userId)
        .subscribe((res) => {
          console.log(res);
          this.loading = false;
        });

      this.router.navigate(['/temp-message/reg']);
    });
  }
  }

  checkUserName() {
    this.userService.getUserByUserName(this.addUser.value.userName).subscribe(
      (res) => {
        this.toastrSer.showError('Username already exists', '');
      },
      (error) => {
        this.toastrSer.showSuccess('Username available', '');
      }
    );
  }
  checkUserEmail() {
    this.userService.getUserByEmail(this.addUser.value.email).subscribe(
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
  
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'name': [ 
      { type: 'required', message: 'Name is required'}
    ],
    'password': [
      { type: 'required', message: 'Password is required ' },
      { type: 'minlength', message: ' Minimum 5 characters' },
      { type: 'pattern', message: ' Your password must be Alphanumric' }
    ],
    'mobile':[
      {type: 'required', message: 'Mobile is required'},
      {type: 'pattern', message: 'Enter 10 digit Mobile Number'}
    ],
    'address':[
      {type: 'required', message: 'Address is required'}
    ],
    'bloodGrp':[
      {type: 'required', message: 'Blood Group is required'}
    ],
    'age':[
      {type: 'required', message: 'Age is required'},
      {type: 'pattern', message: 'Age Range between 0 to 100'}
    ],
    'gender':[
      {type: 'required', message: 'Gender is required'}
    ]
    }

    

}
