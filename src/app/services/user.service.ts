import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
   constructor(private api: ApiService) {}

   getCurrent(): Observable<User> {
      return this.api.get<User>("/users/me");
   }
}
