import { UIFeedbackService } from "./../../services/uifeedback.service"
import { firstValueFrom } from "rxjs"
import { OperationService } from "./../../operation.service"
import { ApiService } from "./../../services/api.service"
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core"
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
})
export class OperationComponent implements OnInit {
  constructor(
    private api: ApiService,
    private operationService: OperationService,
    public ui: UIFeedbackService
  ) {}
  @Input() operation!: Operation

  @Output() showDetailEvent = new EventEmitter<boolean>()

  @ViewChild("deleteButton") deleteBtn!: ElementRef

  _showDetail = false

  ngOnInit(): void {}

  async showDetail(operationId: number) {
    this.showDetailEvent.emit(true)
    this._showDetail = true

    const source = this.operationService.findOne(operationId)
    const operation = await firstValueFrom(source)
    this.operation = operation

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
}
