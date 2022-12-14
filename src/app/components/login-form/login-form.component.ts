import {
   Component,
   ElementRef,
   EventEmitter,
   OnInit,
   Output,
   Renderer2,
   ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UIFeedbackService } from "src/app/services/uifeedback.service";
import { gsap } from "gsap";
import {
   fadeInOnEnterAnimation,
   fadeOutOnLeaveAnimation,
} from "angular-animations";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
   selector: "app-login-form",
   templateUrl: "./login-form.component.html",
   providers: [UIFeedbackService],
   animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class LoginFormComponent implements OnInit {
   @ViewChild("registerButton") rbutton!: ElementRef;
   @Output() closeFormEvent = new EventEmitter();

   form!: FormGroup;

   constructor(
      public ui: UIFeedbackService,
      private auth: AuthenticationService,
      private router: Router,
      private renderer: Renderer2
   ) {}

   ngOnInit(): void {
      gsap.from("#loginForm", {
         opacity: 0,
         duration: 0.5,
      });

      this.initLoginForm();
   }

   initLoginForm() {
      this.form = new FormGroup({
         email: new FormControl({ value: "", disabled: false }, [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
         ]),
         password: new FormControl(
            { value: "", disabled: false },
            Validators.required
         ),
      });
   }

   async submitForm() {
      this.setFeedback("loading");
      return await this.auth.signin(this.form.value).subscribe({
         next: (at) => {
            if (at.access_token) this.auth.setSession(at.access_token);
         },
         complete: () => {
            this.setFeedback("success");
         },
         error: (err: HttpErrorResponse) => {
            this.setFeedback("error");
            console.error("ew, error", err);
         },
      });
   }

   closeForm() {
      gsap.to("#loginForm", {
         opacity: 0,
         duration: 0.5,
         onComplete: () => this.closeFormEvent.emit(true),
      });
   }

   /**
    * Sets the UI feedback.
    *
    * @param {("loading" | "success" | "error")} status
    */
   setFeedback(status: "loading" | "success" | "error") {
      let button = document.querySelector("#submitButton")! as HTMLElement;

      if (status === "loading") {
         this.ui.buttonLoading.create(button);
         this.renderer.setAttribute(this.rbutton.nativeElement, "disabled", "");
      }

      if (status === "success") {
         this.renderer.removeAttribute(this.rbutton.nativeElement, "disabled");
         this.ui.buttonLoading.dismiss(button);
         this.ui.feedback = "success";
         this.ui.timer(3, () => this.router.navigate(["painel"]));
      }

      if (status === "error") {
         this.renderer.removeAttribute(this.rbutton.nativeElement, "disabled");
         this.ui.buttonLoading.dismiss(button);
         this.ui.feedback = "error";
         this.ui.timer(5, () => (this.ui.feedback = undefined));
      }
   }
}
