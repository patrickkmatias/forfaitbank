import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operation } from 'src/app/models/operation.model';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
})
export class OperationComponent implements OnInit {

  @Input() operation!: Operation;

  @Output() showDetailEvent = new EventEmitter<boolean>();

  _showDetail = false;

  constructor() { }

  ngOnInit(): void {

  }

  showDetail() {
    this.showDetailEvent.emit(true);
    this._showDetail = true;
  }

  closeDetail() {
    this.showDetailEvent.emit(false);
    this._showDetail = false;
  }
}
