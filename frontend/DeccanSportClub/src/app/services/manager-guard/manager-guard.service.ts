import { decryptData } from 'src/app/utilities/config';
import { ToastrService } from 'ngx-toastr';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuardService {
  //
  constructor(private _router: Router, private toastr: ToastrService) {}

  //
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // check if user is present or not in session
    if (sessionStorage['user']) {
      if (decryptData(sessionStorage.getItem('user')).userRole == 'MANAGER') {
        return true;
      }
      // if the role dosn't match show error to user
      else {
        this.toastr.warning(
          "You don't have enough rights to access this resource."
        );
        // redirect to home
        this._router.navigate(['/']);
        return false;
      }
    }
    // if user is not present in session then redirect the user to login
    else {
      this.toastr.info('Login to continue');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
