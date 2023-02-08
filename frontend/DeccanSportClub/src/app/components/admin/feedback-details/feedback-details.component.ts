import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { FeedbackService } from 'src/app/services/feedback.service';
import { IFeedback } from 'src/app/utilities/IFeedback';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss'],
})
export class FeedbackDetailsComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) el!: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('feedbackDeatils.pdf');
      },
    });
  }

  fileName = 'feedbackDeatils.xlsx';

  exportexcel(): void {
    let element = document.getElementById('excel.table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
  status = false;
  feedback: IFeedback[] = [];
  constructor(private feedbackService: FeedbackService) {}
  displayedColumns: string[] = ['Name', 'Address', 'Rating', 'Message'];
  dataSource: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.feedbackService.getAllFeedback().subscribe(
      (res) => {
        this.feedback = res;
        console.log(this.feedback);
        this.dataSource = new MatTableDataSource<any>(res);
        console.log(this.dataSource);
        if (this.feedback.length > 0) {
          this.status = false;
        } else {
          this.status = true;
        }
      },
      (error) => {
        this.status = true;
      }
    );
  }
}
