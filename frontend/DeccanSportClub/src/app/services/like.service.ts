import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILike } from '../utilities/ILike';


@Injectable({
  providedIn: 'root'
})
export class LikeService {

 // private baseURL = "http://localhost:8080/admin";

  constructor(private httpClient:HttpClient) { }

  // getLikes(): Observable<ILike[]>{
  //   return this.httpClient.get<ILike[]>(this.baseURL + '/getLikes');
  // }
}
