import { PostFormDataService } from "./post-form-data.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
   providedIn: "root",
})
export class AuthenticationService {
   constructor(private http: PostFormDataService) {}

   signup(user: User): Observable<{ access_token: string }> {
      return this.http.postFormData("/auth/signup", user);
   }

   signin(user: User): Observable<{ access_token: string }> {
      return this.http.postFormData("/auth/signin", user);
   }

   isLoggedIn(): boolean {
      return localStorage.getItem("isLoggedIn") == "true" ? true : false;
   }

   setSession(token: string) {
      localStorage.setItem("access_token", token);
      return localStorage.setItem("isLoggedIn", "true");
   }

   logout() {
      localStorage.removeItem("access_token");
      return localStorage.setItem("isLoggedIn", "false");
   }
}
