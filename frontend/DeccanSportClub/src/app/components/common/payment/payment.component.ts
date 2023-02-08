import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportService } from 'src/app/services/sports-service/sport.service';
import { UserService } from 'src/app/services/user.service';
import { decryptData } from 'src/app/utilities/config';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  amount: number = 0;
  offer: number = 0;
  total: number = 0;
  temp: any;
  enrolledSportsId: number = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private sportService: SportService
  ) {}
  private data = decryptData(sessionStorage['user']);
  ngOnInit(): void {
    if (sessionStorage['membership']) {
      this.amount = sessionStorage['price'];
      this.total = this.amount;
      console.log(this.data);
    }

    if (sessionStorage['enrollingSport']) {
      this.amount = sessionStorage['price'];
      this.offer = sessionStorage['offer'];
      this.total = sessionStorage['totalAmount'];
      this.enrolledSportsId = sessionStorage['enrolledSportsId'];
    }
  }

  payNow() {
    if (sessionStorage['membership']) {
      console.log(this.data.userId);
      this.userService
        .addMembership(this.data.userId, sessionStorage['memType'], this.total)
        .subscribe(
          (res) => {
            console.log(res);
            sessionStorage.removeItem('memType');
            sessionStorage.removeItem('price');
            sessionStorage.removeItem('membership');
            this.router.navigate(['/user/apply-renew-details']);
          },
          (error) => {
            console.log(error);
            sessionStorage.removeItem('memType');
            sessionStorage.removeItem('price');
            sessionStorage.removeItem('membership');
            this.router.navigate(['/user/apply-renew-details']);
          }
        );
        //sessionStorage.removeItem('memType');
       // sessionStorage.removeItem('price');
       // sessionStorage.removeItem('membership');
       // this.router.navigate(['/user/apply-renew-details']);
    }

    if (sessionStorage['enrollingSport']) {
      this.sportService.payFees(this.enrolledSportsId).subscribe(
        (res) => {
          console.log(res);
          this.temp = res;
          sessionStorage.removeItem('enrollingSport');
          sessionStorage.removeItem('price');
          sessionStorage.removeItem('offer');
          sessionStorage.removeItem('totalAmount');
          sessionStorage.removeItem('enrolledSportsId');
          this.router.navigate(['/user/sports/' + this.temp.sportsId.sportsId]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
