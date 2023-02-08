import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
 // private data = decryptData(sessionStorage['user']);

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  @ViewChild('closeBtn') closeBtn:any;
  ngOnInit(): void {
    if(sessionStorage['user']){
      const data = decryptData(sessionStorage['user']);

      this.addFeedback = new FormGroup({
        userName: new FormControl(data.userName),
        name: new FormControl(data.name),
        address: new FormControl(data.address),
        rating: new FormControl(''),
        message: new FormControl(''),
      });
    }else{
      this.addFeedback = new FormGroup({
        userName: new FormControl('Anonymous'),
        name: new FormControl('Anonymous'),
        address: new FormControl('Anonymous'),
        rating: new FormControl(''),
        message: new FormControl(''),
      });
    }
  }

  feedback: any;
  addFeedback:any;

  submit() {
    console.log("in feedback submit")
    this.feedbackService.addFeedback(this.addFeedback).subscribe((res) => {
      this.feedback = res;
      this.closeBtn.nativeElement.click();
    },
    error=>{
      console.log(error)
      this.closeBtn.nativeElement.click();
    });
    
  }
}
