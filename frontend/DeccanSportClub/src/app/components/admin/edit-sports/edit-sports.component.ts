import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SportService } from 'src/app/services/sports-service/sport.service';
import { ISports } from 'src/app/utilities/ISports';

@Component({
  selector: 'app-edit-sports',
  templateUrl: './edit-sports.component.html',
  styleUrls: ['./edit-sports.component.scss'],
})
export class EditSportsComponent implements OnInit {
  editSport: any;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private _activatedRoute: ActivatedRoute,
    private sportsService: SportService
  ) {}
  sportId: any;
  managers: any[] = [];
  sports: any;
  ngOnInit(): void {
    this.sportId = this._activatedRoute.snapshot.params['id'];
    this.sportsService.getSportById(this.sportId).subscribe((res) => {
      this.sports = res;
      console.log(this.sports);
      this.adminService.getAvailManagers().subscribe((res) => {
        this.managers = res;
     if(this.sports.managerId!==null){
        this.managers.push(this.sports.managerId);
     }
        console.log(this.managers);
      },error=>{
        console.log(this.managers)
        this.managers.push(this.sports.managerId);
      });

      this.editSport = new FormGroup({
        sportsId: new FormControl(this.sportId),
        sportsName: new FormControl(this.sports.sportsName),
        sportsCategory: new FormControl(this.sports.sportsCategory),
        managerId: new FormControl(0),
      });
    });
  }

  addSport() {
    console.log(this.editSport.value);
    this.adminService.editSports(this.editSport).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/admin/sports-details');
    },error=>{
      this.ngOnInit();
    });
   
  }
}
