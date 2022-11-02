import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> { 
    return this.http.post<User>('https://forfaitbank-api.herokuapp.com/public/api/register', user);
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>('https://forfaitbank-api.herokuapp.com/public/api/login', user);
  }

}
