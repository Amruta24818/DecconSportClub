import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-profile-dets',
  templateUrl: './profile-dets.component.html',
  styleUrls: ['./profile-dets.component.scss'],
})
export class ProfileDetsComponent implements OnInit {
  private data = decryptData(sessionStorage['user']);
  user: any = this.data;
  //userId:number = this.data.userId;
  constructor(
    private _activateRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this._activateRoute.params.subscribe(data=>{
    //   this.userId = ;  //data.userId
    // });
    // this.userService.getUserById(this.userId).subscribe(data=>{
    //   this.user = data;
    // })
    console.log(this.user);
  }
}
