import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  user: any = {
    // userRole: 'USER',
  };

  constructor(private router: Router) {
    if (sessionStorage['token'] && sessionStorage['user']) {
      this.user = decryptData(sessionStorage['user']);
      // this.navigate(this.user);
    } else this.logout();
  }

  ngOnInit(): void {}

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('remember');
    localStorage.removeItem('_grecaptcha');
    this.router.navigate(['/homepage']);
  }
//not used
  navigate(data: any) {
    // get user data from session
    // const data = decryptData(sessionStorage['user']);
    console.log(data);

    // if role is admin -> admin-dash
    if (data.userRole == 'ADMIN') this.router.navigate(['/admin-dash']);
    // if role is manager -> manager-dash
    else if (data.userRole == 'MANAGER')
      this.router.navigate(['/manager-dash']);
    // if role is user -> user-dash
    else this.router.navigate(['/user-dash']);
  }
}
