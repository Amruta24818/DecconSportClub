import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { IMembership } from 'src/app/utilities/IMembership';
import { ISports } from 'src/app/utilities/ISports';
import { IUser } from 'src/app/utilities/IUser';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {

  manager: IUser[] =[];
  sports:ISports[]=[];
  users: IUser[]=[];
  membership:IMembership[]=[];
  constructor(private adminService:AdminService, private userService: UserService) { }

  ngOnInit(): void {
    this.adminService.getAllManagers().subscribe(data=>{
      this.manager = data;
     })
     this.adminService.getAllSports().subscribe(res=>{
       this.sports = res;
     })
     this.userService.getUsers().subscribe(response=>{
       this.users = response;
       console.log(this.users);
     })
     this.adminService.getAllMemebrship().subscribe(res=>{
       this.membership = res;
     })
    
  }

}
