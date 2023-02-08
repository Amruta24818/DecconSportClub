import { MatTableDataSource } from '@angular/material/table';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { AdminService } from 'src/app/services/admin.service';
import { IUser } from 'src/app/utilities/IUser';

@Component({
  selector: 'app-manager-details',
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.scss'],
})
export class ManagerDetailsComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('managerDeatils.pdf');
      },
    });
  }

  manager: any[] = [];
  
  fileName="managerDeatils.xlsx";

  exportexcel():void{
    let element = document.getElementById("excel.table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    XLSX.writeFile(wb,this.fileName);
  }

 
  displayedColumns: string[] = ['Manager Name', 'Sport Name', 'Hiredate','Actions'];
  dataSource: any;
  manager_obj: any;
  constructor(private adminService: AdminService, private route: Router) {}

  ngOnInit(): void {
      // Allows ngOnInit to be called on routing to the same routing Component
      this.route.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
  
    this.manager = [];
    this.adminService.getAllManagers().subscribe((data) => {
    //  this.dataSource = new MatTableDataSource<any>(data);
      console.log(data);
      if (data != null) {
        data.forEach((m) => {
          // filter limited data -> create a user obj
          this.manager_obj = {
            userId:m.userId,
            userName: m.userName,
            sportsName: m.sportsName,
            userTimestamp: m.userTimestamp

          };
          //
          this.manager.push(this.manager_obj);
        });
      }

      this.dataSource = new MatTableDataSource<any>(this.manager);
      this.manager = data;
    });
  }

  deleteManager(userId: number) {
    console.log(userId);
    this.adminService.deleteManager(userId).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (error) => {
        this.ngOnInit();
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
