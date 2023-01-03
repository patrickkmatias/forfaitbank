import { Component, Input, OnInit } from "@angular/core"
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
          class="overflow-y-auto overflow-x-hidden relative top-0 left-0 w-full h-fit"
        >
          <app-operation
            *ngFor="let op of subOperations"
            id="{{ op.id }}"
            [operation]="op"
            class="flex flex-col h-full"
          ></app-operation>
        </ul>
      </div>
    </div>
  `,
})
export class SubOperationsTableComponent implements OnInit {
  @Input() subOperations!: Operation[]

  constructor() {}

  ngOnInit(): void {}
}
