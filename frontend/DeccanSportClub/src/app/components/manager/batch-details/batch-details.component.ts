import { MatTableDataSource } from '@angular/material/table';

import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { Router } from '@angular/router';

import { ManagerService } from 'src/app/services/manager-service/manager.service';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss'],
})
export class BatchDetailsComponent implements OnInit, OnChanges {

  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('batchDetails.pdf');
      },
    });
  }

  fileName="batchDetails.xlsx";

  exportexcel():void{
    let element = document.getElementById("excel.table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    XLSX.writeFile(wb,this.fileName);
  }

  sport: any;
  sportsId: number = 0;
  sports: string = '';
  batches: any[] = [];
  status = '';


  displayedColumns: string[] = [
    'Batch Name',
    'Timmings',
    'Coach Name',
    'Days',
    'Intake',
    'Offer',
    'Actions',
  ];
  dataSource: any;

  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {}
  batch_obj:any;
  ngOnInit(): void {
    this.batches=[];
    this.managerService.getAssignedSport().subscribe(
      (res) => {
        this.sport = res;
        this.sports = this.sport.sportsName;
        this.status = 'ASSIGNED';
        this.sportsId = this.sport.sportsId;
        this.managerService.getBatchBySportId(this.sportsId).subscribe((res) => {
         // this.batches = res;
          console.log(this.batches);
          if (res != null) {
            res.forEach((b) => {
              // filter limited data -> create a user obj
              this.batch_obj = {
                batchId:b.batchId,
                batchName: b.batchName,
                coachName: b.coachName,
                timings: b.timings,
                days: b.days,
                intake: b.intake,
                offerValues: b.offerValues
              };
              this.batches.push(this.batch_obj);
            });
          }
          this.dataSource = new MatTableDataSource<any>(this.batches);
          console.log(this.dataSource);
        });
      },
      (error) => {
        this.status = 'NOTASSIGNED';
        console.log(error.status);
        console.log('No sports assigned');
      }
    );

   
  }

  //batch is getting deleted but routing to navbar
  deleteBatch(batchId: number) {
    console.log(batchId);
    this.managerService.deleteBatchById(batchId).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    },error=>{
      console.log(error);
      this.ngOnInit();
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
