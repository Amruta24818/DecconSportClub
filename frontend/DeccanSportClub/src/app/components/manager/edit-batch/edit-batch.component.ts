import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchesService } from 'src/app/services/batches-service/batches.service';
import { ManagerService } from 'src/app/services/manager-service/manager.service';

@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.scss'],
})
export class EditBatchComponent implements OnInit {
  editBatch: any;
  batchId: any;
  batch: any;
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private batchService: BatchesService,
    private managerService: ManagerService
  ) {}
  ngOnInit(): void {
    this.batchId = this._activatedRoute.snapshot.params['id'];
    this.batchService.getBatchById(this.batchId).subscribe((res) => {
      this.batch = res;
      console.log(this.batch);
      this.editBatch = new FormGroup({
        batchId: new FormControl(this.batch.batchId),
        batchName: new FormControl(this.batch.batchName),
        coachName: new FormControl(this.batch.coachName),
        timings: new FormControl(this.batch.timings),
        days: new FormControl(this.batch.days),
        intake: new FormControl(this.batch.intake),
        offerValues: new FormControl(this.batch.offerValues),
      });
    });
  }

  editBatches() {
    console.log(this.editBatch.value);
    this.managerService.editBatch(this.editBatch).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/manager/batch-details']);
    });
  }
}
