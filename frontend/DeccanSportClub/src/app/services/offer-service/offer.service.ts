import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPricing } from 'src/app/utilities/IPricing';
import { baseUrl } from 'src/app/utilities/config';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  url = baseUrl+ '/manager';
  constructor(private router: Router, private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage['token'],
    }),
  };

  getOfferById(pricingId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.get(
      this.url + `/getpricebyId/${pricingId}`,
      httpOptions
    );
  }

  addOffer(Offers: any): Observable<IPricing> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.post<IPricing>(
      this.url + '/addOffer',
      Offers.value,
      httpOptions
    );
  }

  editOffer(offer: any): Observable<IPricing> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.put<IPricing>(
      this.url + '/updateprice/'+offer.value.priceId,
      offer.value,
      httpOptions
    );
  }
}
