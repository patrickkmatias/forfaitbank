import { firstValueFrom } from "rxjs"
import { OperationService } from "./../../operation.service"
import { ApiService } from "./../../services/api.service"
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Operation } from "src/app/models/operation.model"

@Component({
  selector: "app-operation",
  templateUrl: "./operation.component.html",
  providers: [ApiService, OperationService],
})
export class OperationComponent implements OnInit {
  @Input() operation!: Operation

  @Output() showDetailEvent = new EventEmitter<boolean>()

  _showDetail = false

  constructor(
    private api: ApiService,
    private operationService: OperationService
  ) {}

  ngOnInit(): void {}

  async showDetail(operationId: number) {
    this.showDetailEvent.emit(true)
    this._showDetail = true

    const source = this.operationService.findOne(operationId)
    const operation = await firstValueFrom(source)
    this.operation = operation;

    return operation
  }

  closeDetail() {
    this.showDetailEvent.emit(false)
    this._showDetail = false
  }

  delete(id: number) {
    return this.api.delete(`/operations/${id}`).subscribe()
  }
}
