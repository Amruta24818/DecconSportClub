import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerService } from 'src/app/services/manager-service/manager.service';
import { IEnrolledUsers } from 'src/app/utilities/IEnrolledUsers';

@Component({
  selector: 'app-manager-dash',
  templateUrl: './manager-dash.component.html',
  styleUrls: ['./manager-dash.component.scss']
})
export class ManagerDashComponent implements OnInit {

  enrolledUser:any[]=[];
  pendingUser:any[] = [];
  rejectedUser:any[] = [];
  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    
    this.managerService.getAllApprovedUsers().subscribe(res=>{
      if(res !==null){
      this.enrolledUser = res;
      }
      console.log(res);
    })
    
    this.managerService.getAllPendingUser().subscribe(res=>{
      if(res !==null){
        this.pendingUser = res;
        }
      console.log(res);
    })

    this.managerService.getAllRejectedUser().subscribe(res=>{
      if(res !==null){
        this.rejectedUser = res;
        }
      
      console.log(res);
    })

  }

}
