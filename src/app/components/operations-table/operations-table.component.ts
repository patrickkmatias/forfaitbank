import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations-table',
  templateUrl: './operations-table.component.html',
  styleUrls: ['./operations-table.component.css']
})
export class OperationsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    // it hides|shows all other app-operation that are not in focus.
    toggleDetail(show: boolean, id: number) {

      let displayProp = show ? 'none' : 'initial';
  
      let allOperations = document.querySelectorAll('app-operation');
      
      allOperations.forEach(op => {
        // if the id is different from the parameter id, put display none|block
        if(Number(op.getAttribute('ng-reflect-id')) != id) {
          let _op = op as HTMLElement;
          _op.style.display = displayProp;
        }
      })
      
    }

}
