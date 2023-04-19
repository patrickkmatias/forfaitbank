import { HttpErrorResponse } from "@angular/common/http";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { first, firstValueFrom, lastValueFrom, Observable } from "rxjs";
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

   async signinAsGuest(): Promise<void> {
      if (this.getGuest()) {
         return this.setSession(this.getGuest()!)
      }

      const req = this.api.post<{ access_token: string }>("/guest/create")
      const { access_token } = await firstValueFrom(req)
      
      return this.setGuest(access_token)
   }

   setSession(token: string) {
      localStorage.setItem("access_token", token);
      return localStorage.setItem("isLoggedIn", "true");
   }

   validateSession() {
      this.api.get("/users/me").subscribe({
         error: (e) => {
            this.logout();
            throw e;
         },
      });
   }

   getSession(): string | null {
      return localStorage.getItem("access_token");
   }

   setGuest(token: string) {
      localStorage.setItem("guest_token", token);
      return this.setSession(token);
   }

   getGuest(): string | null {
      return localStorage.getItem("guest_token");
   }

   logout() {
      localStorage.removeItem("access_token");
      return localStorage.setItem("isLoggedIn", "false");
   }
   
   isLoggedIn(): boolean {
      return localStorage.getItem("isLoggedIn") == "true" ? true : false;
   }
}
