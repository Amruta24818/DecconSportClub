import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from "xlsx";
import { AdminService } from 'src/app/services/admin.service';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';
import { decryptData } from 'src/app/utilities/config';
import { IComments } from 'src/app/utilities/IComments';
import { IUser } from 'src/app/utilities/IUser';

@Component({
  selector: 'app-like-comment-logs',
  templateUrl: './like-comment-logs.component.html',
  styleUrls: ['./like-comment-logs.component.scss'],
})
export class LikeCommentLogsComponent implements OnInit {
  like: string = 'like';
  comment: string = '';

  Likes: any;
  Comments: any[] = [];

  private data = decryptData(sessionStorage['user']);
  userId: number = this.data.userId;
  constructor(private userService: UserService) {}

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

  ngOnInit(): void {
    this.userService.getLikeByUserId(this.userId).subscribe((res) => {
      this.Likes = res;
      console.log(res);
    });

    this.userService.getCommentByUserId(this.userId).subscribe((res) => {
      this.Comments = res;
      console.log(res);
    });
  }

  LikeLogs() {
    this.like = 'like';
    this.comment = '';
  }

  CommentLogs() {
    this.comment = 'comment';
    this.like = '';
  }
}
