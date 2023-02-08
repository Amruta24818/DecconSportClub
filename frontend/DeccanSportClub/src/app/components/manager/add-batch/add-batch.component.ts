import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BatchesService } from 'src/app/services/batches-service/batches.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss'],
})
export class AddBatchComponent implements OnInit {
  constructor(private batchService: BatchesService, private router: Router) {}

  addBatch: any;
  ngOnInit(): void {
    this.addBatch = new FormGroup({
      batchName: new FormControl(''),
      timings: new FormControl(''),
      coachName: new FormControl(''),
      days: new FormControl(''),
      intake: new FormControl(0),
      offerValues: new FormControl(0),
    });
  }

  registerBatch() {
    console.log('hello');
    console.log(this.addBatch.value);
    this.batchService.addBatch(this.addBatch).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/manager/batch-details');
    });
  }
}
