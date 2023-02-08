import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../utilities/IUser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IEnrolledUsers } from '../utilities/IEnrolledUsers';
import { IMembership } from '../utilities/IMembership';

import { ILike } from '../utilities/ILike';
import { IComments } from '../utilities/IComments';
import { baseUrl } from '../utilities/config';
import { IUserDTO } from '../utilities/IUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = baseUrl+ '/user';
  constructor(private httpClient:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage['token'],
    }),
  };
  getUserById(userId:number):Observable<IUser>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser>(this.baseURL+"/getUser/"+userId,httpOptions);
  }


  getEnrolledSports(userId:number):Observable<IEnrolledUsers[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IEnrolledUsers[]>(this.baseURL+"/enrolledSports/"+userId,httpOptions);
  }

  getMembershipDetails(userId:number):Observable<IMembership>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IMembership>(this.baseURL+"/membership/"+userId,httpOptions);
  }

  getUserByUsername(username:string):Observable<IUser>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser>(this.baseURL+ "/getUserByName"+ username, httpOptions);
  }

  addMembership(userId:number,membershipType:string,membershipCost:number){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    const membership={
      "userId":userId,
      "membershipType":membershipType,
      "membershipCost":membershipCost
    }
    return this.httpClient.post(this.baseURL+"/addMembership",membership,httpOptions);
  }


  getLikeByUserId(userId:number):Observable<ILike[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<ILike[]>(this.baseURL+ '/getLikeByUserId/'+userId, httpOptions);
  }

  getCommentByUserId(userId:number):Observable<IComments[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IComments[]>(this.baseURL+ '/getCommentByUserId/'+userId, httpOptions);
  }

  user:IUserDTO = {
    userId:0,
    newPassword:""
  }

  editPassword(userID:number,newPassWord:string):Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    console.log(userID);
    this.user={
      userId:userID,
      newPassword:newPassWord
    }
    console.log(this.user);
    return this.httpClient.put<string>(this.baseURL+"/changePwd",this.user,httpOptions);
  }

  getOtp(email:string):Observable<string>{


    return this.httpClient.get<string>(this.baseURL+"/getotp/"+email)

  }

  addUser(user:any):Observable<any>{
  
    return this.httpClient.post<any>(this.baseURL+"/addUser",user.value);
  }

  activateAccount(userId:any):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/activateAccount/"+userId);
  }

  getUsers(): Observable<IUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/getAllUsers',
      httpOptions
    );
  }

  getUserEnrolledSports():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/getUserEnrolledSports',
      httpOptions
    );
  }

  getUserPendingBatches():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/getUserPendingBatches',
      httpOptions
    );
  }

  getUserRejectedBatches():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/getUserRejectedBatches',
      httpOptions
    );
  }

  forgetPassword(email:any,newPassword:any):Observable<any>{
    const user={
      newPassword:newPassword
    }
    return this.httpClient.put<string>(this.baseURL+"/forgotpsw/"+email,user);
  }

  forgetOtp(email:any):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/forgetOtp/"+email);
  }

  getUserToken(email:any):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/getUserToken/"+email);
  }

  getUserByEmail(email:string):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/getUserByEmail/"+email);
  }

  getUserByUserName(username:string):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/getUserByUserName/"+username);
  }

}


