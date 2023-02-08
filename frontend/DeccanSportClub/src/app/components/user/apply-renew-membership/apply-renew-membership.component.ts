import { MatTableDataSource } from '@angular/material/table';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { UserService } from 'src/app/services/user.service';
import { IMembership } from 'src/app/utilities/IMembership';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-apply-renew-membership',
  templateUrl: './apply-renew-membership.component.html',
  styleUrls: ['./apply-renew-membership.component.scss'],
})
export class ApplyRenewMembershipComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('apply-renewDeatils.pdf');
      },
    });
  }

  fileName = 'apply-renewDeatils.xlsx';

  exportexcel(): void {
    let element = document.getElementById('excel.table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  private data = decryptData(sessionStorage['user']);

  userMembership: any;
  displayedColumns: string[] = [
    'Membership Type',
    'Documents',
    'Price',
    'Actions',
  ];
  dataSource: any;
  membership: any[] = [
    {
      memType: 'YEARLY',
      documents:
        'Form Duly Filled up. Latest Colour Photographs of Specific Size (25 X 30 mm) – 3 Nos. Xerox copy of Photo Identity (Passport, Driving Licence, Election Card, Pan Card, Company/College/School I - Card) Current Address Proof. (Ration Card, Electricity/Phone Bill)',
      price: 500000,
      apply: false,
      applied: false,
      renew: false,
    },
    {
      memType: 'MONTHLY',
      documents:
        'Form Duly Filled up. Latest Colour Photographs of Specific Size (25 X 30 mm) – 3 Nos. Xerox copy of Photo Identity (Passport, Driving Licence, Election Card, Pan Card, Company/College/School I - Card) Current Address Proof. (Ration Card, Electricity/Phone Bill)',
      price: 100000,
      apply: false,
      applied: false,
      renew: false,
    },
    {
      memType: 'QUATERLY',
      documents:
        'Form Duly Filled up. Latest Colour Photographs of Specific Size (25 X 30 mm) – 3 Nos. Xerox copy of Photo Identity (Passport, Driving Licence, Election Card, Pan Card, Company/College/School I - Card) Current Address Proof. (Ration Card, Electricity/Phone Bill)',
      price: 50000,
      apply: false,
      applied: false,
      renew: false,
    },
  ];

  constructor(private userService: UserService, private router: Router) {
    this.ngOnInit();
  }

  ngOnInit(): void {
      // Allows ngOnInit to be called on routing to the same routing Component
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
  
    this.userService.getMembershipDetails(this.data.userId).subscribe(
      (res) => {
        this.userMembership = res;
        this.exec();
        this.dataSource = new MatTableDataSource<any>(this.userMembership);
        console.log(this.dataSource);
      },
      (error) => {
        this.dataSource = new MatTableDataSource<any>(this.userMembership);
        console.log(error);
        if (this.userMembership !== undefined) {
          this.exec();
        }
        for (let val of this.membership) {
          val.apply = true;
          val.applied = false;
          val.renew = false;
        }
      }
    );
  }

  exec() {
    console.log(this.userMembership);
    if (this.userMembership.membershipType === 'YEARLY') {
      //For type yearly
      this.memLogic('YEARLY');
    } else if (this.userMembership.membershipType === 'MONTHLY') {
      //For type monthly
      this.memLogic('MONTHLY');
    } else if (this.userMembership.membershipType === 'QUATERLY') {
      //For type quaterly
      this.memLogic('QUATERLY');
    }
  }

  memLogic(type: string) {
    //checking end date
    let endDate = new Date(this.userMembership.endDate);
    let currentDate = new Date();
    if (currentDate > endDate) {
      //membership is expired , needed to renew
      this.displayAction(type, true);
    } else {
      //not expired
      this.displayAction(type, false);
    }
  }

  displayAction(type: string, isExpired: boolean) {
    for (let val of this.membership) {
      if (isExpired) {
        if (val.memType === type) {
          val.apply = false;
          val.applied = false;
          val.renew = true;
        } else {
          val.apply = true;
          val.applied = false;
          val.renew = false;
        }
      } else {
        if (val.memType === type) {
          val.apply = false;
          val.applied = true;
          val.renew = false;
        } else {
          val.apply = false;
          val.applied = false;
          val.renew = false;
        }
      }
    }
  }

  memAction(memType: string, price: number) {
    sessionStorage['memType'] = memType;
    sessionStorage['price'] = price;
    sessionStorage['membership'] = true;
    this.router.navigateByUrl('/user/payment');
  }
}
