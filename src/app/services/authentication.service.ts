import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private _apiUrl = "https://forfaitbank-api.herokuapp.com/public/api";

  registerUser(user: User): Observable<User> { 
    return this.http.post<User>(`${this._apiUrl}/register`, user);
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this._apiUrl}/login`, user);
  }

  isLoggedIn(): boolean {
    return (localStorage.getItem('isLoggedIn') == 'true') ? true : false;
  }

  login() {
    return localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    return localStorage.setItem('isLoggedIn', 'false');
  }

}
