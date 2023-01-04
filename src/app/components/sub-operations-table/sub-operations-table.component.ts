import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Operation } from "src/app/models/operation.model"

@Component({
  selector: "app-sub-operations-table",
  template: `
    <p class="h-fit w-fit ml-1">Sub-operações desta operação:</p>
    <div class="h-full w-full rounded-lg overflow-hidden">
      <div
        class="h-full w-full bg-emerald-900 overflow-y-auto overflow-x-hidden"
      >
        <ul
          [class.!h-full]="selectedOperationId > 0"
          class="overflow-y-auto overflow-x-hidden relative top-0 left-0 w-full h-fit"
        >
          <app-operation
            *ngFor="let op of subOperations"
            id="{{ op.id }}"
            minifiedSubOperationView="true"
            [operation]="op"
            [class.hidden]="
              selectedOperationId > 0 && selectedOperationId !== op.id
            "
            (selectIndex)="select($event)"
            class="flex flex-col h-full"
          ></app-operation>
        </ul>
      </div>
    </div>
  `,
})
export class SubOperationsTableComponent implements OnInit {
  @Input() parentOperation!: Operation
  @Input() subOperations!: Operation[]
  @Output() maximize = new EventEmitter<boolean>()

  showSub = true

  private _selectedOperationId: number = -1

  get selectedOperationId(): number {
    return this._selectedOperationId
  }

  set selectedOperationId(value: number) {
    this._selectedOperationId = value
    this.maximize.emit(!!value)
  }

  select(operationId: number) {
    this.selectedOperationId = operationId
  }

  constructor() {}

  ngOnInit(): void {}
}
