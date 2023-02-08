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
import { IUser } from 'src/app/utilities/IUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnChanges {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('LockedUserDeatils.pdf');
      },
    });
  }

  fileName = 'LockedUserDeatils.xlsx';

  exportexcel(): void {
    let element = document.getElementById('excel.table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  users: IUser[] = [];
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone No',
    'Address',
    'Registration Date',
    'Actions',
  ];
  dataSource: any;
  constructor(private adminService: AdminService, private route: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  user_obj:any;

  ngOnInit(): void {
    this.users = [];

    this.adminService.getAllUsers().subscribe((res) => {
      if (res != null) {
        res.forEach((u) => {
          // filter limited data -> create a user obj
          this.user_obj = {
            name:u.name,
            email: u.email,
            address: u.address,
            mobile: u.mobile,
            userTimestamp: u.userTimestamp
          };
          //
          this.users.push(this.user_obj);
        });
      }
      
      this.dataSource = new MatTableDataSource<any>(res);
      console.log(this.dataSource);
    });
  }

  lockUnlock(userId: number) {
    this.adminService.lockUnlock(userId).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.ngOnInit();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
