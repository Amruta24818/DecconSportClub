import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BatchesService } from 'src/app/services/batches-service/batches.service';
import { SportService } from 'src/app/services/sports-service/sport.service';
import { decryptData } from 'src/app/utilities/config';
import { IEnrolledUsers } from 'src/app/utilities/IEnrolledUsers';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss'],
})
export class MessageDisplayComponent implements OnInit {
  constructor(
    private batchService: BatchesService,
    private sportService: SportService,
    private router: Router
  ) {}

  totalAmount: any;
  status: string = '';
  batch: any;
  enrolledSports: any;
  @Input() fromParent: any;
  user: any;
  // for comments
  // for displaying all comments create array
  comments: any = [];
  // to add comment take input
  comment: string = '';
  loggedIn = false;
  ngOnInit(): void {
    console.log('Dialog on init');
    //check if user is logged in and if not then display this.status = "NOTLOGIN"
    if (sessionStorage['user'] == null) {
      console.log('not logged in');
      this.status = 'NOTLOGIN';
    } else {
      this.loggedIn = true;
      console.log('loggedin');
      this.user = decryptData(sessionStorage['user']);
      if (this.fromParent.status == 'COMMENT') {
        this.batchService
          .getBatchOfferComments(this.fromParent.batchId)
          .subscribe((res) => {
            console.log(res);
            this.comments = res;
            console.log(this.comments);
          });

        this.status = 'COMMENT';
        console.log('comment');
      } else {
        let totalFees = 0;
        //console.log('This is in modal: ' + JSON.stringify(this.fromParent));
        this.batchService
          .getBatchById(this.fromParent.batchId)
          .subscribe((res) => {
            this.batch = res;
            console.log(this.batch);
            totalFees =
              this.fromParent.price -
              this.fromParent.price * (this.batch.offerValues / 100);

            this.totalAmount = totalFees;
            if (this.fromParent.isMember) {
              //match the price on pricing data

              if (
                this.fromParent.price === this.fromParent.pricing.membersCharges
              ) {
                //check if user has already enrolled for particular batch
                this.sportService
                  .isEnrolled(this.fromParent.userId, this.fromParent.batchId)
                  .subscribe(
                    (res) => {
                      //already enrolled and paid for batch
                      if (res.paymentStatus === 0) {
                        //already enrolled for particular batch
                        this.enrolledSports = res;
                        if (this.enrolledSports.enrolledStatus === 0) {
                          //wait for approval now
                          this.status = 'WAITING';
                        } else if (this.enrolledSports.enrolledStatus === 1) {
                          //approved
                          this.status = 'APPROVED';
                        } else if (this.enrolledSports.enrolledStatus === 2) {
                          //rejected
                          this.status = 'REJECTED';
                        }
                      } else {
                        //already paid message
                        if (res.enrolledStatus === 1) {
                          this.status = 'PAID';
                        }
                        if (res.enrolledStatus === 2) {
                          this.status = 'REFUND';
                        }
                      }
                    },
                    (error) => {
                      //new enrollment

                      const enrollUser = {
                        userId: this.fromParent.userId,
                        sportsId: this.fromParent.pricing.sportsId.sportsId,
                        batchId: this.fromParent.batchId,
                        fees: totalFees,
                      };

                      this.sportService
                        .enrollUser(enrollUser)
                        .subscribe((res) => {
                          this.enrolledSports = res;
                          //wait for approval now
                          this.status = 'WAITING';
                        });
                    }
                  );
              } else {
                //incorrectly chosen: member choosing non member pricing
                this.status = 'MEMBERONLY';
              }
            } else {
              if (
                this.fromParent.price ===
                this.fromParent.pricing.nonMemberCharges
              ) {
                //non member selected correct price

                //check if user has already enrolled for particular batch
                this.sportService
                  .isEnrolled(this.fromParent.userId, this.fromParent.batchId)
                  .subscribe(
                    (res) => {
                      //already enrolled and paid for batch
                      if (res.paymentStatus === 0) {
                        //already enrolled for particular batch
                        this.enrolledSports = res;
                        if (this.enrolledSports.enrolledStatus === 0) {
                          //wait for approval now
                          this.status = 'WAITING';
                        } else if (this.enrolledSports.enrolledStatus === 1) {
                          //approved
                          this.status = 'APPROVED';
                        } else if (this.enrolledSports.enrolledStatus === 2) {
                          //rejected
                          this.status = 'REJECTED';
                        }
                      } else {
                        //already paid message

                        this.status = 'PAID';
                      }
                    },
                    (error) => {
                      //new enrollment
                      const enrollUser = {
                        userId: this.fromParent.userId,
                        sportsId: this.fromParent.pricing.sportsId.sportsId,
                        batchId: this.fromParent.batchId,
                        fees: totalFees,
                      };

                      this.sportService
                        .enrollUser(enrollUser)
                        .subscribe((res) => {
                          this.enrolledSports = res;
                          //wait for approval now
                          this.status = 'WAITING';
                        });
                    }
                  );
              } else {
                //selected incorrect price
                this.status = 'NOTMEMBER';
              }
            }
          });
      }
    }
  }
  //TODO: remaining to fetch in payment screen and updating enrolledSports details.
  payNow() {
    sessionStorage['enrolledSportsId'] = this.enrolledSports.enrolledSportsId;
    sessionStorage['price'] = this.fromParent.price;
    sessionStorage['offer'] = this.batch.offerValues;
    sessionStorage['totalAmount'] = this.totalAmount;
    sessionStorage['enrollingSport'] = true;
    this.router.navigateByUrl('/user/payment');
  }

  addComment() {
    if (this.comment.length != 0) {
      this.batchService
        .addComment(this.fromParent.batchId, this.comment)
        .subscribe((res) => {
          console.log(res);
          this.ngOnInit();
        });
    }
  }
}
