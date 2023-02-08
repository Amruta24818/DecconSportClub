import { MatTableDataSource } from '@angular/material/table';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

import { ManagerService } from 'src/app/services/manager-service/manager.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {
  sportsId: number = 0; //needed to change
  sports: string = '';
  offers: any[] = [];
  displayedColumns: string[] = ['ForMembers', 'ForNonMembers', 'Actions'];
  dataSource: any;
  sport: any;
  status = '';

  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('offerDeatils.pdf');
      },
    });
  }

  fileName = 'offerDeatils.xlsx';

  exportexcel(): void {
    let element = document.getElementById('excel.table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
  flag = false;
  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit(): void {
    this.offers = [];

    this.managerService.getAssignedSport().subscribe(
      (res) => {
        this.sport = res;
        this.status = 'ASSIGNED';
        this.sportsId = this.sport.sportsId;
        this.sports = this.sport.sportsName;
        this.managerService.getPricingBySportId(this.sportsId).subscribe(
          (res) => {
            //this.offers = res;
            if (res != null) {
              this.offers.push(res);
            }
            this.dataSource = new MatTableDataSource<any>(this.offers);
            console.log('res');
            console.log(res);
          },
          (error) => {
            this.offers = [
              {
                membersCharges: 'No record Found',
                nonMemberCharges: 'No record Found',
              },
            ];
          }
        );
      },
      (error) => {
        this.status = 'NOTASSIGNED';
        console.log(error.status);
        console.log('No sports assigned');
      }
    );

    console.log(this.offers);
  }

  deleteOffer(priceId: number) {
    console.log(priceId);
    this.managerService.deletePricingById(priceId).subscribe(
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
}
