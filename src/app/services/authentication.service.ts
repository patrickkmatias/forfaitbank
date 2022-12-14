import { ApiService } from './api.service';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
   providedIn: "root",
})
export class AuthenticationService {
   constructor(private api: ApiService) {}

   signup(user: User): Observable<{ access_token: string }> {
      return this.api.postFormData("/auth/signup", user);
   }

   signin(user: User): Observable<{ access_token: string }> {
      return this.api.postFormData("/auth/signin", user);
   }

   isLoggedIn(): boolean {
      return localStorage.getItem("isLoggedIn") == "true" ? true : false;
   }

   setSession(token: string) {
      localStorage.setItem("access_token", token);
      return localStorage.setItem("isLoggedIn", "true");
   }

   getSession(): string | null {
      return localStorage.getItem("access_token");
   }

   logout() {
      localStorage.removeItem("access_token");
      return localStorage.setItem("isLoggedIn", "false");
   }
}
