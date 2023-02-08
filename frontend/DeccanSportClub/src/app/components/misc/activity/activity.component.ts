import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { ManagerService } from 'src/app/services/manager-service/manager.service';

export interface ActivityTable {
  batchName: string;
  timing: string;
  days: string;
  coach: string;
  memberCharges: number;
  nonMemberCharges: number;
  offers: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  displayedColumns: string[] = [
    'Sports Name',
    'Batch Name',
    'Timing',
    'Days',
    'Coach',
    'Member Charges',
    'NonMember Charges',
    'Offers',
  ];
  dataSource: any;

  constructor(
    private adminService: AdminService,
    private managerService: ManagerService,
    private toaster: ToastrService
  ) {}

  actObj: any;
  activityArr: any[] = [];

  ngOnInit(): void {
    //here we are getting all sports
    this.adminService.getAllSports().subscribe((res) => {
      if (res.length == 0) {
        this.toaster.info('No activites avaliable');
      }

      //get All batches of particular sports
      // and then iterating each sport to fetch all batches related to that perticular sport as well as its pricing
      res.forEach((s) => {
        // 1. fetching all batchs by passing sportId
        this.managerService.getBatchBySportId(s.sportsId).subscribe(
          // on success
          (response) => {
            // 2. then fetching the pricing details of that sport
            this.managerService
              .getPricingBySportId(s.sportsId)
              .subscribe((r) => {
                // 3. creatr activity object
                this.actObj = {
                  sportsName: s.sportsName,
                  batch: response,
                  pricing: r,
                };

                // 4. then push that obj in activity array
                this.activityArr.push(this.actObj);

                // 5. then pass that array of objects to mat-table as a datasource
                this.dataSource = new MatTableDataSource<any>(this.activityArr);
              });
          },
          // on error
          (error) => {
            this.toaster.info(error.status);
          }
        );
      });
    });
  }
}
