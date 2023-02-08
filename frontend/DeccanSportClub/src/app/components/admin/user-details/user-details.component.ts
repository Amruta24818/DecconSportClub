import { MatTableDataSource } from '@angular/material/table';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { AdminService } from 'src/app/services/admin.service';
import { IEnrolledUsers } from 'src/app/utilities/IEnrolledUsers';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('UserDeatils.pdf');
      },
    });
  }

  fileName = 'UserDeatils.xlsx';

  exportexcel(): void {
    let element = document.getElementById('excel.table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  user: IEnrolledUsers[] = [];
  user_obj:any ;

  displayedColumns: string[] = [
    'Username',
    'Sport Name',
    'Batch Name',
    'Timmings',
    'Days',
    'fees',
    'payment',
    'Enrolled Status',
  ];
  dataSource: any;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.user = [];
    this.adminService.getAllEnrolledUsers().subscribe((res) => {
      // if response is not null then only show data
      console.log(res);
      if (res != null) {
        res.forEach((u) => {
          // filter limited data -> create a user obj
          this.user_obj = {
            enrolledSportsId: u.enrolledSportsId,
            userId: u.userId.userName,
            sportsId: u.sportsId.sportsName,
            batchId: u.batchId.batchName,
            fees: u.fees,
            timings: u.batchId.timings,
            enrolledStatus: u.enrolledStatus,
            paymentStatus: u.paymentStatus,
            days:u.batchId.days
          };
          //
          this.user.push(this.user_obj);
        });
      }

      this.dataSource = new MatTableDataSource<any>(this.user);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
