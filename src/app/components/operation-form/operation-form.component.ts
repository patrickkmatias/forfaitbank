import { UIFeedbackService } from "./../../services/uifeedback.service"
import { OperationService } from "./../../operation.service"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from "@angular/core"
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from "angular-animations"
@Component({
  selector: "app-operation-form",
  templateUrl: "./operation-form.component.html",
  styles: ["div#packagesContainer::-webkit-scrollbar{display: none}"],
  providers: [OperationService, UIFeedbackService],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class OperationFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl<string>("Operação 1", [Validators.required]),
    value: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1000),
    ]),
    billType: new FormControl<number | null>(null, [Validators.required]),
  })

  @ViewChildren("bill10,bill50,bill100")
  bills!: QueryList<ElementRef>

  @ViewChild("submitButton") submitButton!: ElementRef

  @Output() disableReturn = new EventEmitter<boolean>()

  constructor(
    private renderer: Renderer2,
    private operationService: OperationService,
    public ui: UIFeedbackService
  ) {}

  ngOnInit(): void {}

  toggleBill(billType: "10" | "50" | "100"): void {
    let activeClass = "!bg-emerald-600"

    this.bills.forEach((el) => {
      let bill = el.nativeElement as HTMLElement
      let isSelectedBill =
        bill.getAttribute("id") == `bill${billType}` ? true : false

      if (isSelectedBill) {
        this.renderer.addClass(bill, activeClass)
      } else {
        this.renderer.removeClass(bill, activeClass)
      }
    })

    this.form.get("billType")?.setValue(Number(billType))
  }

  submitForm() {
    this.setFeedback("loading")

    const operation = this.operationService.create(this.form.value)

    const response = {
      complete: () => {
        this.setFeedback("success")
      },
      error: (err: unknown) => {
        this.setFeedback("error")
        console.error("ew, error", err)
      },
    }


    return operation.subscribe(response)
  }

  setFeedback(status: "loading" | "success" | "error") {
    let btn = this.submitButton.nativeElement as HTMLElement
    this.ui.feedback = status;

    if (status === "loading") {
      this.ui.buttonLoading.create(btn)
      this.disableReturn.emit(true)
      return
    }

    if (status === "success" || status === "error") {
      this.ui.buttonLoading.dismiss(btn)
      this.disableReturn.emit(false)
    }
    this.ui.timer(5, () => (this.ui.feedback = undefined))
  }
}
