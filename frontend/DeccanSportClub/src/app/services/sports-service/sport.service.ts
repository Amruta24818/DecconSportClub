import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEnrolledUsers } from 'src/app/utilities/IEnrolledUsers';
import { IPricing } from 'src/app/utilities/IPricing';
import { ISports } from 'src/app/utilities/ISports';
import { baseUrl } from 'src/app/utilities/config';
@Injectable({
  providedIn: 'root',
})
export class SportService {
  url = baseUrl+ '/sport/';

  constructor(private router: Router, private httpClient: HttpClient) {}

  fetchAllSportsByCategory(category: string) {
    return this.httpClient.get(this.url + `getAll${category}Sports`);
  }

  getSportById(sportId: number): Observable<ISports> {
    return this.httpClient.get<ISports>(this.url + `${sportId}`);
  }

  getPricingBySportsId(sportId: number): Observable<IPricing> {
    return this.httpClient.get<IPricing>(this.url + 'pricing/' + sportId);
  }

  isEnrolled(userId: number, batchId: number): Observable<IEnrolledUsers> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IEnrolledUsers>(
      this.url + 'isEnrolled/' + userId + '/' + batchId,
      httpOptions
    );
  }

  enrollUser(enrollUser: any): Observable<IEnrolledUsers> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.post<IEnrolledUsers>(
      this.url + 'enrollUser',
      enrollUser,
      httpOptions
    );
  }

  payFees(enrollId: number): Observable<IEnrolledUsers> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IEnrolledUsers>(
      this.url + 'payFees/' + enrollId,
      httpOptions
    );
  }
}
