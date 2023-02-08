import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

import { ISports } from 'src/app/utilities/ISports';

@Component({
  selector: 'app-add-sports',
  templateUrl: './add-sports.component.html',
  styleUrls: ['./add-sports.component.scss'],
})
export class AddSportsComponent implements OnInit {
  managers: any[] = [];
  file: any;
  loading: boolean = false; // Flag variable
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.getAvailManagers().subscribe((res) => {
      this.managers = res;
      console.log(this.managers);
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  addSports = new FormGroup({
    sportsName: new FormControl(''),
    sportsCategory: new FormControl(''),
    managerId: new FormControl(0),
  });
  sports: any;
  status = false;
  submit() {
    this.status = true;
    this.adminService.addSports(this.addSports).subscribe((res) => {
      console.log(res);
      this.sports = res;
      console.log(this.sports.sportsId);
      this.loading = !this.loading;
      console.log(this.addSports.value);
      console.log(this.file);
      this.adminService
        .upload(this.file, this.sports.sportsId)
        .subscribe((res) => {
          console.log(res);
          this.loading = false;
          this.router.navigate(['/admin/sports-details']);
        },error=>{
          this.router.navigate(['/admin/sports-details']);
        });
      
    });
  }
}
