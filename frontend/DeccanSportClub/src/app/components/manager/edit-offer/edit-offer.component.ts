import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager-service/manager.service';
import { OfferService } from 'src/app/services/offer-service/offer.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
})
export class EditOfferComponent implements OnInit {
  princingId: any;
  sportsId: any;
  offers: any;
  editOffer: any;
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.princingId = this._activatedRoute.snapshot.params['id'];
    console.log(this.princingId);
    this.offerService.getOfferById(this.princingId).subscribe((res) => {
      this.offers = res;
      console.log(this.offers);
      this.editOffer = new FormGroup({
        priceId: new FormControl(this.offers.priceId),
        membersCharges: new FormControl(this.offers.membersCharges),
        nonMemberCharges: new FormControl(this.offers.nonMemberCharges),
      });
    });
  }
  onEditOffers() {
    console.log(this.editOffer.value);
    this.offerService.editOffer(this.editOffer).subscribe((res) => {
      console.log(res);
       this.router.navigate(['/manager/offer-details']);
    });
   
  }
}
