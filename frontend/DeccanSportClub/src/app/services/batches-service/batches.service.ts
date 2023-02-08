import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/utilities/config';
import { IBatches } from 'src/app/utilities/IBatches';
@Injectable({
  providedIn: 'root',
})
export class BatchesService {
  url = baseUrl+'/batches/';

  constructor(private router: Router, private httpClient: HttpClient) {}


  httpOptions = {

    headers: new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage['token'],
    }),
  };

  getAllBatches(sportId: number) {
    return this.httpClient.get(this.url + `batchDetails/${sportId}`);
  }

  getBatchById(batchId: number) {
    return this.httpClient.get(
      this.url + `batchById/${batchId}`
      // ,this.httpOptions
    );
  }

  getBatchOfferComments(batchId: number) {
    return this.httpClient.get(this.url + `comments/${batchId}`);
  }

  addComment(batchId: number, comment: string) {
   const httpOptions = {

      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    const body = {
      batchesId: { batchId: batchId },
      comments: comment,
    };

    return this.httpClient.post(this.url + `comment`, body, httpOptions);
  }

  getAllLikes() {
    return this.httpClient.get(this.url + `likes`);
  }

  like(batchId: number) {
    const httpOptions = {

      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    const body = {
      batchId: {
        batchId: batchId,
      },
    };
    return this.httpClient.post(this.url + `like`, body, httpOptions);
  }

  unlike(batch: any) {
    const httpOptions = {

      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.post(this.url + `unlike`, batch, httpOptions);
  }


  addBatch(batches: FormGroup): Observable<IBatches> {
    const httpOptions = {

      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.post<IBatches>(
      this.url + `addBatch`,
      batches.value,
      httpOptions
    );
  }
}
