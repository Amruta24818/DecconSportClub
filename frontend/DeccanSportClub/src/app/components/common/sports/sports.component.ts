import { BatchesService } from '../../../services/batches-service/batches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/services/sports-service/sport.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDisplayComponent } from '../message-display/message-display.component';
import { UserService } from 'src/app/services/user.service';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss'],
})
export class SportsComponent implements OnInit {
  // logged in status
  loggedIn = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private batchesService: BatchesService,
    private sportService: SportService,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    if (sessionStorage['user'] != null) {
      this.loggedIn = true;
      console.log('loggedin');
    } else console.log('not logged in');
  }

  sportId: number = 0;

  // step 1 : fetch sport details from details
  sport: any = {};
  fetchSport() {
    this.sportService.getSportById(this.sportId).subscribe((res) => {
      this.sport = res;
      console.log(this.sport);
    });
  }

  // Step 2 : for pricing cards
  pricing: any = {};
  getPricingDetails() {
    console.log("in pricing")
    this.sportService.getPricingBySportsId(this.sportId).subscribe(
      (res) => {
        this.pricing = res;
        console.log(this.pricing);
        if(res===null){
         
          this.pricing= {
            membersCharges:"Not yet added",
            nonMemberCharges:"Not yet added"
          }
        }
      },
      (error) => {
        console.error(error);
        this.pricing= {
          membersCharges:"Not yet added",
          nonMemberCharges:"Not yet added"
        }
      }
    );
  }

  // step 3 : fetching all batches related to sport
  batches: any = [];
  fetchAllBatches(sportId: number) {
    this.batchesService.getAllBatches(sportId).subscribe((response: any) => {
      this.batches = response;
      console.log(this.batches);

      // fetch likes only when batches are avaliable
      // fetch all likes of
      this.fetchAllLikes();
    });
  }

  //
  isMember: boolean = false;
  user: any = {};
  membershipDetails() {
    if (this.loggedIn) {
      this.user = decryptData(sessionStorage['user']);

      this.userService.getMembershipDetails(this.user.userId).subscribe(
        (res) => {
          this.isMember = true;
        },
        (error) => {
          console.error(error.status);
        }
      );
    }
  }

  // all likes
  likes: any = [];
  // returns count of likes for perticular batch
  counts: any = {};
  fetchAllLikes() {
    this.batchesService.getAllLikes().subscribe((resp: any) => {
      this.likes = resp;

      // fetch what batches user has liked
      //so that we can show like or unlike button according to it
      if (this.loggedIn) this.userLikedBatches(resp);

      // filter the resp array => only filter batchId and Like count in  another object called counts
      resp.forEach((x: any) => {
        this.counts[x.batchId.batchId] =
          (this.counts[x.batchId.batchId] || 0) + 1;
      });

      // adding likes property to batches array
      this.batches.map((batch: any) => {
        batch.likes = this.counts[batch.batchId];
      });
    });
  }

  // to get current user likes for the batch offers via sport id
  user_likes: any = [];
  userLikedBatches(resp: any) {
    const user = decryptData(sessionStorage['user']);

    // adding all the batches likes that user has liked
    resp.filter((element: any) => {
      // if the userId of logged in user is equal to userId of the obj present in like array
      // then push that batchId to user_likes array
      if (user.userId == element.userId.userId)
        this.user_likes.push(element.batchId.batchId);
    });
  }

  ngOnInit(): void {
    this.likes = [];
    this.counts = {};
    this.user_likes = [];

    this.sportId = this._activatedRoute.snapshot.params['sportsId'];

    //retrieving from DB
    this.fetchSport();

    // to fetch batches releted to perticular sport
    this.fetchAllBatches(this.sportId);

    // get prices of sport for members and non-members
    this.getPricingDetails();

    // get current logged in member membership details
    this.membershipDetails();
  }

  openDialog(batchId: number, price: number) {
    const dialogRef = this.dialog.open(MessageDisplayComponent, {
      // backdropClass: 'backdropBackground'
    });
    let data = {
      userId: this.user.userId,
      batchId: batchId,
      price: price,
      pricing: this.pricing,
      isMember: this.isMember,
    };
    dialogRef.updateSize('60%', '40%');
    dialogRef.componentInstance.fromParent = data;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result: ' + result);
    });
  }

  openDialogComments(batchId: number) {
    const dialogRef = this.dialog.open(MessageDisplayComponent, {
      // backdropClass: 'backdropBackground'
    });
    let data = {
      batchId: batchId,
      status: 'COMMENT',
    };
    dialogRef.updateSize('80%', '70%');
    dialogRef.componentInstance.fromParent = data;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result: ' + result);
    });
  }

  like(batchId: number) {
    console.log('like');

    this.batchesService.like(batchId).subscribe((r: any) => {
      console.log(r);
      this.ngOnInit();
    });
  }

  unlike(batchId: number) {
    const batch = this.likes.filter((like: any) => {
      if (batchId == like.batchId.batchId) {
        return like.batchId;
      }
    });
    console.log('unlike');

    this.batchesService.unlike(batch[0]).subscribe((r: any) => {
      console.log(r);
      this.ngOnInit();
    });

   
  }
}
