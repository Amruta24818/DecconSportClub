import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/app/utilities/config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url =baseUrl+"/user/login"

  constructor(
    private router: Router,
    private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }
    return this.httpClient.post(this.url , body)
  }

}
