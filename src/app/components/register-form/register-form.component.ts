import {
   Component,
   ElementRef,
   EventEmitter,
   Input,
   OnInit,
   Output,
   Renderer2,
   ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { createMask } from "@ngneat/input-mask";
import { UIFeedbackService } from "src/app/services/uifeedback.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { gsap } from "gsap";
import {
   fadeInOnEnterAnimation,
   fadeOutOnLeaveAnimation,
} from "angular-animations";

@Component({
   selector: "app-register-form",
   templateUrl: "./register-form.component.html",
   providers: [UIFeedbackService],
   animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class RegisterFormComponent implements OnInit {
   @ViewChild("backButton") bbutton!: ElementRef;
   @Input() isEditMode = false;
   @Output() closeFormEvent = new EventEmitter<boolean>();

   form!: FormGroup;
   cpfMask = createMask("999.999.999-99");

   constructor(
      public ui: UIFeedbackService,
      private auth: AuthenticationService,
      private renderer: Renderer2
   ) {}

   ngOnInit(): void {
      gsap.from("#registerForm", {
         opacity: 0,
         duration: 0.5,
      });

      this.initRegisterForm();

      if (this.isEditMode) {
         this.setupEditMode();
      }
   }

   initRegisterForm() {
      this.form = new FormGroup({
         name: new FormControl(null, [Validators.required]),
         email: new FormControl(null, [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
         ]),
         address: new FormControl(null, [Validators.required]),
         cpf: new FormControl(null, [Validators.required]),
         birthdate: new FormControl(null, [Validators.required]),
         password: new FormControl(null, [Validators.required]),
      });
   }

   setupEditMode(): void {}

   closeForm(): void {
      gsap.to("#registerForm", {
         opacity: 0,
         duration: 0.5,
         onComplete: () => this.closeFormEvent.emit(true),
      });
   }

   async submitForm() {
      this.setFeedback("loading");

      return await this.auth.signup(this.form.value).subscribe({
         complete: () => {
            this.setFeedback("success");
         },
         error: (err: unknown) => {
            this.setFeedback("error");
            console.error("ew, error", err);
         },
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
         this.renderer.setAttribute(this.bbutton.nativeElement, "disabled", "");
      }

      if (status === "success") {
         this.renderer.removeAttribute(this.bbutton.nativeElement, "disabled");
         this.ui.buttonLoading.dismiss(button);
         this.ui.feedback = "success";
         this.ui.timer(5, this.closeForm.bind(this));
      }

      if (status === "error") {
         this.renderer.removeAttribute(this.bbutton.nativeElement, "disabled");
         this.ui.buttonLoading.dismiss(button);
         this.ui.feedback = "error";
         this.ui.timer(5, () => (this.ui.feedback = undefined));
      }
   }
}
