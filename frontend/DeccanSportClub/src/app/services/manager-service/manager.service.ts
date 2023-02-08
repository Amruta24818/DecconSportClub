import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBatches } from 'src/app/utilities/IBatches';
import { IEnrolledUsers } from 'src/app/utilities/IEnrolledUsers';
import { IPricing } from 'src/app/utilities/IPricing';
import { baseUrl } from 'src/app/utilities/config';
@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private baseURL = baseUrl+ '/manager';
  private baseURLCommon = baseUrl+ '/common';
  private baseURLSport: string = baseUrl+ '/sport';
  constructor(private httpClient: HttpClient) {}

  getBatchBySportId(sportId: number): Observable<IBatches[]> {
    return this.httpClient.get<IBatches[]>(
      this.baseURLCommon + '/getbatchbysport/' + sportId
    );
  }

  deleteBatchById(batchId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(
      this.baseURL + '/deletebatch/' + batchId,
      httpOptions
    );
  }

  getPricingBySportId(sportId: number): Observable<IPricing> {
    return this.httpClient.get<IPricing>(
      this.baseURLCommon + '/getpricebysport/' + sportId
    );
  }

  deletePricingById(pricingId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.delete(
      this.baseURL + '/deleteprice/' + pricingId,
      httpOptions
    );
  }

  getEnrolledSportsBySportsId(sportsId: number): Observable<IEnrolledUsers[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.get<IEnrolledUsers[]>(
      this.baseURL + '/getenrollmentlist/' + sportsId,
      httpOptions
    );
  }

  approveUser(enrollId: number): Observable<IEnrolledUsers> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.get<IEnrolledUsers>(
      this.baseURL + '/approve/' + enrollId,
      httpOptions
    );
  }

  rejectUser(enrollId: number): Observable<IEnrolledUsers> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.get<IEnrolledUsers>(
      this.baseURL + '/reject/' + enrollId,
      httpOptions
    );
  }
  editBatch(batch: any): Observable<IBatches> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.put<IBatches>(
      this.baseURL + '/updateBatch/' + batch.value.batchId,
      batch.value,
      httpOptions
    );
  }

  getAssignedSport(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<any>(
      this.baseURL + '/assignedSport',
      httpOptions
    );
  }

  getAllApprovedUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<any>(
      this.baseURL + '/getAllApprovedEnrUser',
      httpOptions
    );
  }

  getAllPendingUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<any>(
      this.baseURL + '/getAllPendingUser',
      httpOptions
    );
  }

  getAllRejectedUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<any>(
      this.baseURL + '/getAllRejectedUser',
      httpOptions
    );
  }
}
