import { SportService } from '../../../services/sports-service/sport.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sport-category',
  templateUrl: './sport-category.component.html',
  styleUrls: ['./sport-category.component.scss'],
})
export class SportCategoryComponent implements OnInit {
  //category: string = 'Indoor';
  category: any; //= 'Outdoor';
  sports: any = [];

  // logged in status
  loggedIn = false;

  constructor(
    private sportsService: SportService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    // Allows ngOnInit to be called on routing to the same routing Component
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.category = this._activatedRoute.snapshot.params['category'];

    // fetch all the sports by passing category to it weather its "indoor" or "outdoor"
    this.sportsService.fetchAllSportsByCategory(this.category).subscribe(
      // on success
      (response: any) => {
        if (response.length == 0) {
          this.toaster.info('No ' + this.category + ' Sports avaliable');
        }

        this.sports = response;
        sessionStorage['sports'] = JSON.stringify(this.sports);
      },
      // on error
      (error) => {
        this.toaster.warning(error.status);
      }
    );
  }
}
