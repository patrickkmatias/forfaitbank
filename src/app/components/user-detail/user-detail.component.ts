import { UserService } from "./../../services/user.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import {
   fadeInOnEnterAnimation,
   fadeOutOnLeaveAnimation,
} from "angular-animations";
import { User } from "src/app/models/user.model";

@Component({
   selector: "app-user-detail",
   templateUrl: "./user-detail.component.html",
   animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
   providers: [UserService],
})
export class UserDetailComponent implements OnInit {
   user!: User;

   @Output("firstName") firstName = new EventEmitter<string>();

   edit = false;

   constructor(
      private auth: AuthenticationService,
      private router: Router,
      private userService: UserService
   ) {}

   ngOnInit(): void {
      this.userService.getCurrent().subscribe((user: User) => {
         this.user = user;
         this.firstName.emit(user.name.split(" ").shift());
      });
   }

   logout(): void {
      this.auth.logout();
      this.router.navigate(["login"]);
   }
}
