import { firstValueFrom } from "rxjs"
import { OperationService } from "./../../operation.service"
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Operation } from "src/app/models/operation.model"
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from "angular-animations"

@Component({
  selector: "app-operation",
  templateUrl: "./operation.component.html",
  providers: [OperationService],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class OperationComponent implements OnInit {
  constructor(private operationService: OperationService) {}
  @Input() operation!: Operation
  @Output() selectIndex = new EventEmitter<number>()

  isParent?: boolean
  status?: string
  cachedOperation?: Operation

  loadingDetail = false
  showDetail = false
  showCancel = false

  ngOnInit(): void {
    this.isParent = this.operation.children.length > 0 ? true : false

    this.status =
      this.operation.status === "concluded"
        ? "Concluído"
        : this.operation.status === "closed"
        ? "Fechado"
        : this.operation.status === "reserved"
        ? "Reservado"
        : "Indefinido"
  }

  async loadOperation() {
    this.selectIndex.emit(this.operation.id)
    this.loadingDetail = true

    if (!this.cachedOperation) {
      setTimeout(() => {
        this.showCancel = true
      }, 5000);

      const request = this.operationService.findOne(this.operation.id)
      this.cachedOperation = await firstValueFrom(request)

      if (this.isParent) {
        // load children
        const request = this.operationService.findChildren(this.operation.id)
        this.cachedOperation.children = await firstValueFrom(request)
      }
    }

    this.loadingDetail = false
    this.showDetail = true
  }

  cancel() {
    this.loadingDetail = false
    this.cachedOperation = undefined;
  }

  closeDetail() {
    this.showDetail = false
    this.selectIndex.emit(-1)
  }
}
