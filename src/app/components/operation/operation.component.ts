import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  @Input() id:number = 0;

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