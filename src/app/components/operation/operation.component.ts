import { Package } from "./../../models/package.model"
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

  status?: string
  loadingDetail = false
  showDetail = false
  cachedOperation?: Operation

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

  async loadOperation() {
    this.selectIndex.emit(this.operation.id)
    this.loadingDetail = true

    if (!this.cachedOperation) {
      const source = this.operationService.findOne(this.operation.id)
      const operation = await firstValueFrom(source)
      this.cachedOperation = operation
    }

    this.loadingDetail = false
    this.showDetail = true
  }

  closeDetail() {
    this.showDetail = false
    this.selectIndex.emit(-1)
  }
}
