import { ApiService } from "../../services/api.service"
import { Operation } from "../../models/operation.model"
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { UIFeedbackService } from "../../services/uifeedback.service"
import { Package } from "../../models/package.model"
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from "angular-animations"

@Component({
  selector: "app-operation-detail",
  templateUrl: "./operation-detail.component.html",
  providers: [UIFeedbackService],
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
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class OperationDetailComponent implements OnInit {
  @Input() operation!: Operation
  @Output() onClose = new EventEmitter<boolean>()

  status = "Indefinido"
  confirmDeletion?: boolean

  selectedPackage: Package | null = null
  selectedPackageId?: number

  constructor(public ui: UIFeedbackService, private api: ApiService) {}

  ngOnInit(): void {
    this.status =
      this.operation.status === "concluded"
        ? "Concluído"
        : this.operation.status === "closed"
        ? "Fechado"
        : this.operation.status === "reserved"
        ? "Reservado"
        : "Indefinido"
  }

  showParent() {
    // this.operation.parentOperationId
  }

  selectPackage(id: number) {
    if (this.selectedPackage == null || this.selectedPackage.id !== id) {
      const index = this.operation.packages.findIndex((pkg) => pkg.id === id)!
      this.selectedPackage = null

      this.selectedPackage = this.operation.packages[index]
    } else {
      this.selectedPackage = null
    }
  }

  deleteOperation() {
    if(this.confirmDeletion === undefined) {
      this.confirmDeletion = false
      return
    } else {
      this.confirmDeletion = true
    }

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

    return this.api.delete(`/operations/${this.operation.id}`).subscribe(response)
  }

  setFeedback(status: "loading" | "success" | "error") {
    this.ui.feedback = status
    if (status === "error")
      this.ui.timer(5, () => (this.ui.feedback = undefined))
  }

  return() {
    if(this.confirmDeletion === false) {
      this.confirmDeletion = undefined
      return
    }
    this.onClose.emit(true)
  }
}
