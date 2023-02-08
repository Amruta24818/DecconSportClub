import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFeedback } from '../utilities/IFeedback';
import { baseUrl } from '../utilities/config';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private URL = baseUrl+ '/admin';
  private baseURL = "http://localhost:7070/feedback";
 
  private url = baseUrl+ '/user';
  constructor(private httpClient:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage['token'],
    }),
  };

  addFeedback(feedback:FormGroup):Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    console.log(feedback.value);
    return this.httpClient.post<string>(this.baseURL+"/addFeedback",feedback.value,httpOptions)
  }

  getAllFeedback(): Observable<IFeedback[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };

    return this.httpClient.get<IFeedback[]>(
      this.URL + '/getAllFeedbacks',
      httpOptions
    );
  }
}
