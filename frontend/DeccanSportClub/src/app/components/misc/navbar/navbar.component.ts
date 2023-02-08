import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  data: any;
  user: any;
  status: string = '';

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    if (sessionStorage['user']) {
      this.data = decryptData(sessionStorage['user']);
      this.status = 'USER';
      this.user = {
        username: this.data.userName,
        userRole: this.data.userRole,
      };
    } else {
      this.status = 'NEWUSER';
    }
  }
  logout() {
    sessionStorage.clear();
    this.changeDetector.detectChanges();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('remember');
    localStorage.removeItem('_grecaptcha');

    this.router.navigate(['/']);
    this.ngOnInit();
  }
}
