import { decryptData } from 'src/app/utilities/config';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuardService implements CanActivate {
  //
  constructor(private _router: Router, private toastr: ToastrService) {}

  //
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // check if user is present or not in session
    if (sessionStorage['user']) {
      if (decryptData(sessionStorage.getItem('user')).userRole == 'USER') {
        return true;
      }
      // if the role dosn't match show error to user
      else {
        this.toastr.warning(
          'Admin can not access this resource. Log in as User'
        );
        // redirect to home
        this._router.navigate(['/']);
        return false;
      }
    }
    // if user is not present in session then redirect the user to login
    else {
      this.toastr.info('Login to Continue');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
