import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer-service/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  constructor(private offerService: OfferService, private router: Router) {}
  addOffer: any;
  ngOnInit(): void {
    this.addOffer = new FormGroup({
      membersCharges: new FormControl(''),
      nonMemberCharges: new FormControl(''),
    });
  }

  registerOffer() {
    console.log('hello');
    console.log(this.addOffer.value);
    this.offerService.addOffer(this.addOffer).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/manager/offer-details']);
    });
  }
}
