import { MatTableDataSource } from '@angular/material/table';

import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { AdminService } from 'src/app/services/admin.service';
import { ISports } from 'src/app/utilities/ISports';

@Component({
  selector: 'app-sports-details',
  templateUrl: './sports-details.component.html',
  styleUrls: ['./sports-details.component.scss'],
})
export class SportsDetailsComponent implements OnInit, OnChanges {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;
  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('sportsDeatils.pdf');
      },
    });
  }

  fileName = 'sportsDeatils.xlsx';

  exportexcel(): void {
    let element = document.getElementById('excel.table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  // sports: any[]=[{
  //   image: '',
  //   sportName: 'Football',
  //   managerAssigned: 'John',
  //   category: 'outdoor'
  // }]
  sports: ISports[] = [];
  displayedColumns: string[] = [
    'Upload Image',
    'Sport Name',
    'Catagory',
    'Manager Assigned',
    'Actions',
  ];
  dataSource: any;
  status: any;

  managerName: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  sports_obj: any;

  ngOnInit(): void {
     // Allows ngOnInit to be called on routing to the same routing Component
     this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.sports = [];
    this.fetchAllSports();
  }

  //fetch Sports
  fetchAllSports() {
    // fetch all the sports  avaliable in db
    this.adminService.getAllSports().subscribe((res) => {
      console.log(res);

      // if the response is contatining sports
      if (res != null) {
        // then create a sports object and push it into sports array and
        // then pass the sports array as a data source
        res.forEach((s) => {
          // filter limited data -> create a user obj

          // before creating sports object check if any manager is associated to that sport
          // if manager is not associated to that sport then show '-'
          if (s.managerId == null) {
            s.managerId = { name: '- ' };
          }

          this.sports_obj = {
            sportsId: s.sportsId,
            imagePath: s.imagePath,
            sportsName: s.sportsName,
            sportsCategory: s.sportsCategory,
            managerId: s.managerId.name,
          };

          this.sports.push(this.sports_obj);
        });
      }
      this.dataSource = new MatTableDataSource<any>(this.sports);
    });
  }

  deleteSports(sportsId: number) {
    this.adminService.deleteSports(sportsId).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();  //TODO: refresh only table
      },
      (error) => {
        this.ngOnInit();
      }
    );
  }

  addSports() {
    this.adminService.getAvailManagers().subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/admin/add-sports']);
      },
      (error) => {
        this.status = 'avail';
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
