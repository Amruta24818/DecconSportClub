import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IComments } from '../utilities/IComments';
import { IEnrolledUsers } from '../utilities/IEnrolledUsers';
import { IFeedback } from '../utilities/IFeedback';
import { ILike } from '../utilities/ILike';
import { IMembership } from '../utilities/IMembership';
import { ISports } from '../utilities/ISports';
import { IUser } from '../utilities/IUser';
import { baseUrl } from '../utilities/config';
@Injectable({
  providedIn: 'root',
})
export class AdminService {

  

  private baseURL = baseUrl+"/admin";
  private url = baseUrl+'/user';
  private baseURLSport: string = baseUrl+'/sport';

  constructor(private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage['token'],
    }),
  };

  getAllManagers(): Observable<IUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/managerDetails',
      httpOptions
    );
  }

  deleteManager(userId: number): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    console.log(userId);
    return this.httpClient.delete<string>(
      this.baseURL + '/deleteManager/' + userId,
      httpOptions
    );
  }

  getAllUsers(): Observable<IUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/userDetails',
      httpOptions
    );
  }

  lockUnlock(userId: number): Observable<string> {
    // const opts = { params: new HttpParams({fromString: "userId="+userId}) };
    // this.params = this.params.append('userId',userId);
    //this.params = this.params.append('_limit', 10);
    //let params = new HttpParams();
    // params = params.append("userId",userId);
    // console.log(params);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<string>(
      this.baseURL + '/lockUnlock/' + userId,
      httpOptions
    );
  }

  addSports(sports: FormGroup): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.post<string>(
      this.baseURL + '/addSports',
      sports.value,
      httpOptions
    );
  }

  upload(file: File, sportsId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    if (file) {
      formData.append('file', file, file.name);
    }
    // Make http post request over api
    // with formData as req
    return this.httpClient.post(
      this.baseURL + '/upload/' + sportsId,
      formData,
      httpOptions
    );
  }

  getAllSports(): Observable<ISports[]> {
    return this.httpClient.get<ISports[]>(this.baseURLSport + '/getAllSports');
  }

  deleteSports(sportsId: number): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    console.log(sportsId);
    return this.httpClient.delete<string>(
      this.baseURL + '/deleteSport/' + sportsId,
      httpOptions
    );
  }

  getAllEnrolledUsers(): Observable<IEnrolledUsers[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IEnrolledUsers[]>(
      this.baseURL + '/userEnrolled',
      httpOptions
    );
  }

  addManager(manager: any): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.post<IUser>(
      this.baseURL + '/addManager',
      manager.value,
      httpOptions
    );
  }

  getManagerById(managerId: number): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser>(
      this.url + '/getUser/' + managerId,
      httpOptions
    );
  }

  editManager(manager: any): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.put<IUser>(
      this.baseURL + '/editManager',
      manager.value,
      httpOptions
    );
  }

  getLikes(): Observable<ILike[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<ILike[]>(
      this.baseURL + '/getLikes',
      httpOptions
    );
  }

  getComments(): Observable<IComments[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IComments[]>(
      this.baseURL + '/getComments',
      httpOptions
    );
  }

  getAvailManagers(): Observable<IUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IUser[]>(
      this.baseURL + '/availableManagers',
      httpOptions
    );
  }

  editSports(sports: any): Observable<ISports> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.put<ISports>(
      this.baseURL + '/editSport',
      sports.value,
      httpOptions
    );
  }

  getAllMemebrship(): Observable<IMembership[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage['token'],
      }),
    };
    return this.httpClient.get<IMembership[]>(
      this.baseURL + '/membershipDetails',
      httpOptions
    );
  }

  uploadProfileImg(file: File, userId: number): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    if (file) {
      formData.append('file', file, file.name);
    }
    // Make http post request over api
    // with formData as req
    return this.httpClient.post(
      this.baseURL + '/uploadProfileImg/' + userId,
      formData
    );
  }
}
