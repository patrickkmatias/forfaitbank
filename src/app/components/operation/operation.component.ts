import { Package } from "./../../models/package.model"
import { UIFeedbackService } from "./../../services/uifeedback.service"
import { firstValueFrom } from "rxjs"
import { OperationService } from "./../../operation.service"
import { ApiService } from "./../../services/api.service"
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Operation } from "src/app/models/operation.model"
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from "angular-animations"

@Component({
  selector: "app-operation",
  templateUrl: "./operation.component.html",
  providers: [OperationService, UIFeedbackService],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
  styles: [
    `
      ::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: 640px) {
        ::-webkit-scrollbar {
          display: block;
          height: 0.7rem;
        }
      }
    `,
  ],
})
export class OperationComponent implements OnInit {
  constructor(
    private api: ApiService,
    private operationService: OperationService,
    public ui: UIFeedbackService,
    private cdr: ChangeDetectorRef
  ) {}
  @Input() operation!: Operation

  @Output() showDetailEvent = new EventEmitter<boolean>()
  _showDetail = false
  loadingDetail = false

  selectedPackageId?: number
  selectedPackage: Package | null = null;

  ngOnInit(): void {}

  async showDetail(operationId: number) {
    this.showDetailEvent.emit(true)
    this.loadingDetail = true

    const source = this.operationService.findOne(operationId)
    const operation = await firstValueFrom(source)
    this.operation = operation

    this.loadingDetail = false
    this._showDetail = true

    console.log(operation)
    return operation
  }

  closeDetail() {
    this.showDetailEvent.emit(false)
    this._showDetail = false
  }

  delete(id: number) {
    this.setFeedback("loading")

    const response = {
      complete: () => {
        this.setFeedback("success")
      },
      error: (err: unknown) => {
        this.setFeedback("error")
        console.error("ew, error", err)
      },
    }

    return this.api.delete(`/operations/${id}`).subscribe(response)
  }

  setFeedback(status: "loading" | "success" | "error") {
    this.ui.feedback = status
    if (status === "error")
      this.ui.timer(5, () => (this.ui.feedback = undefined))
  }

  // its better by index
  selectPackage(id: number) {
    if (this.selectedPackage == null || this.selectedPackage.id !== id) {
      const index = this.operation.packages.findIndex(
        (pkg) => pkg.id === id
      )!
      this.selectedPackage = null

      this.selectedPackage = this.operation.packages[index]
    } else {
      this.selectedPackage = null
    }
  }
}
