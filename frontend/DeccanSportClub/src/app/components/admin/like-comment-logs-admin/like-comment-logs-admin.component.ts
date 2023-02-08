import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-like-comment-logs-admin',
  templateUrl: './like-comment-logs-admin.component.html',
  styleUrls: ['./like-comment-logs-admin.component.scss']
})
export class LikeCommentLogsAdminComponent implements OnInit {

  @ViewChild('pdfTable',{static:false}) el!:ElementRef;

  makePDF(){
    let pdf = new jsPDF('p','pt','a2');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("LikeCommentDeatils.pdf");
      }
    })
    
  }

  fileName="LikeCommentDeatils.xlsx";

  exportexcel():void{
    let element = document.getElementById("excel.table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

    XLSX.writeFile(wb,this.fileName);
  }

  like:string= 'like';
  comment: string='';
  
  Likes:any[] = [];
  Comments: any[]=[];
  constructor(  private adminService: AdminService ) { }
  
  ngOnInit(): void {
    this.adminService.getLikes().subscribe(res=>{
      this.Likes = res;
      console.log(res);
    })

    this.adminService.getComments().subscribe(res=>{
      this.Comments = res;
      console.log(res);
    })
  }

  LikeLogs(){
    this.like= 'like'
    this.comment = ''
  }

  CommentLogs(){
    this.comment = 'comment';
    this.like = '';
  }
}
