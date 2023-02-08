import { MatTableDataSource } from '@angular/material/table';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { UserService } from 'src/app/services/user.service';
import { IEnrolledUsers } from 'src/app/utilities/IEnrolledUsers';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-enrolled-details',
  templateUrl: './enrolled-details.component.html',
  styleUrls: ['./enrolled-details.component.scss'],
})
export class EnrolledDetailsComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('enrolledDeatils.pdf');
      },
    });
  }


  fileName="enrolledDetails.xlsx";

  exportexcel():void{
    let element = document.getElementById("excel.table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    XLSX.writeFile(wb,this.fileName);
  }

  private data = decryptData(sessionStorage['user']);
  userId: number = this.data.userId;

  sportEnrolled: any[] = [];
  displayedColumns: string[] = [
    'Sport Name',
    'Batch Name',
    'Timmings',
    'Days',
    'Coach Name',
    'Fees',
    'Enrolled Status',
    'Payment Status',
  ];
  dataSource: any;
  constructor(private userService: UserService) {}
  enroll_obj:any;
  ngOnInit(): void {
    this.sportEnrolled= [];
    this.userService.getEnrolledSports(this.userId).subscribe((res) => {
      console.log(res)
     // this.sportEnrolled = res;
      if (res != null) {
        res.forEach((s) => {
          // filter limited data -> create a user obj
          console.log(s.sportsId.sportsName)
          this.enroll_obj = {
            sportsName : s.sportsId.sportsName,
            batchName: s.batchId.batchName,
            timings: s.batchId.timings,
            days: s.batchId.days,
            coachName:s.batchId.coachName,
            fees: s.fees,
            enrolledStatus:s.enrolledStatus,
            paymentStatus:s.paymentStatus
            
          };
          console.log(this.enroll_obj)
          this.sportEnrolled.push(this.enroll_obj);
          console.log(this.sportEnrolled)
        });
      }
      this.dataSource = new MatTableDataSource<any>(this.sportEnrolled);
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
