import { MatTableDataSource } from '@angular/material/table';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { UserService } from 'src/app/services/user.service';
import { IMembership } from 'src/app/utilities/IMembership';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-membership-details',
  templateUrl: './membership-details.component.html',
  styleUrls: ['./membership-details.component.scss'],
})
export class MembershipDetailsComponent implements OnInit {
  private data = decryptData(sessionStorage['user']);
  userId: number = this.data.userId;
  membership: any[]=[];
  displayedColumns: string[] = [
    'Membership Type',
    'Start Date',
    'End Date',
    'Cost Paid',
  ];
  dataSource: any;

  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('membershipDeatils.pdf');
      },
    });
  }

  fileName="membershipDeatils.xlsx";

  exportexcel():void{
    let element = document.getElementById("excel.table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    XLSX.writeFile(wb,this.fileName);
  }

  constructor(private userService: UserService) {}

  membership_obj:any;
  ngOnInit(): void {
    this.membership=[];
    this.userService.getMembershipDetails(this.userId).subscribe(
      (res) => {
        this.membership_obj = res;
        this.membership.push(this.membership_obj);
        console.log(this.membership);
        
        this.dataSource = new MatTableDataSource<any>(this.membership);
        console.log(this.dataSource);
      },
      (error) => {
        this.membership_obj = {
          membershipType: 'Not a member yet',
          startDate: '',
          endDate: '',
          costPaid: 0,
        };
        this.membership.push(this.membership_obj);
        this.dataSource = new MatTableDataSource<any>(this.membership);
        console.log(this.dataSource);
      }
    );
  }
}
