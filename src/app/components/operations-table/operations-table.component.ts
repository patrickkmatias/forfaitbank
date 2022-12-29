import { OperationService } from "./../../operation.service"
import { Component, ElementRef, ViewChild } from "@angular/core"
import { Operation } from "src/app/models/operation.model"
import { Observable } from "rxjs"
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from "angular-animations"

@Component({
  selector: "app-operations-table",
  templateUrl: "./operations-table.component.html",
  styles: ["ul::-webkit-scrollbar{display: none;}"],
  providers: [OperationService],
  animations: [
    fadeInOnEnterAnimation({ duration: 300 }),
    fadeOutOnLeaveAnimation({ duration: 300 }),
  ],
})
export class OperationsTableComponent {
  constructor(private operationService: OperationService) {}
  @ViewChild("operationsUl") operationsUl!: ElementRef<HTMLElement>

  operations$: Observable<Operation[]> = this.operationService.findAll()
  loadingTable = false
  loadingDetail = false

  showFilters = false
  showAddForm = false
  selectedOperationId: number = -1

  select(operationId: number) {
    this.selectedOperationId = operationId
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
  }

  disableButtons() {
    this.loadingTable = !this.loadingTable
  }
}
