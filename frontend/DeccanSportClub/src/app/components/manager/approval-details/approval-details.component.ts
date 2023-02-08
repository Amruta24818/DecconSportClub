import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { ManagerService } from 'src/app/services/manager-service/manager.service';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.scss']
})
export class ApprovalDetailsComponent implements OnInit,OnChanges {

  @ViewChild('pdfTable',{static:false}) el!:ElementRef;

  makePDF(){
    let pdf = new jsPDF('p','pt','a3');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("approvalDeatils.pdf");
      }
    })
    
  }

  fileName="approvalDeatils.xlsx";

  exportexcel():void{
    let element = document.getElementById("excel.table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    XLSX.writeFile(wb,this.fileName);
  }

  sportsId:number=0; 
  approvalTable : any[]=[];
  displayedColumns: string[] = ['Username', 'Batch Name', 'Timmings', 'Days', 'Status', 'Actions']
  dataSource: any;
  constructor(private managerService:ManagerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
sport:any;
status='';
sportsName = '';
approve_obj: any;
  ngOnInit(): void {
    this.approvalTable=[];
    this.managerService.getAssignedSport().subscribe(res=>{
      this.sport = res;
      this.status="ASSIGNED";
      this.sportsName= this.sport.sportsName;
     
      this.sportsId = this.sport.sportsId;
      this.managerService.getEnrolledSportsBySportsId(this.sportsId).subscribe(res=>{
    //this.approvalTable.push(res);
    // this.approvalTable = res;
   // console.log(this.approvalTable);
   console.log(res);
   if (res != null) {
    res.forEach((a) => {
      // filter limited data -> create a user obj
      this.approve_obj = {
        enrolledSportsId: a.enrolledSportsId,
        userName: a.userId.userName,
        batchName: a.batchId.batchName,
        timings: a.batchId.timings,
        days:a.batchId.days,
        enrolledStatus:a.enrolledStatus
      };
      this.approvalTable.push(this.approve_obj);
      console.log(this.approvalTable)
    });
  }
    this.dataSource = new MatTableDataSource<any>(this.approvalTable);
     // console.log(res);
  })
    },error=>{
      this.status="NOTASSIGNED";
      console.log(error.status);
      console.log("No sports assigned");
    })


  }

  approve(enrolledSportsId:number){
    this.managerService.approveUser(enrolledSportsId).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    },error=>{
      console.log(error);
      this.ngOnInit();
    })
   
  }


  reject(enrolledSportsId:number){
    this.managerService.rejectUser(enrolledSportsId).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    },error=>{
      console.log(error);
      this.ngOnInit();
    })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
