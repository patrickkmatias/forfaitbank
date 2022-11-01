import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations-table',
  templateUrl: './operations-table.component.html',
  styleUrls: ['./operations-table.component.css']
})
export class OperationsTableComponent implements OnInit {

  showAddForm = false;

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

    toggleAddOperationView() {

      if (!this.showAddForm) {
        
        this.toggleDetail(true, -1)
        
        document.getElementById('endDarkGradient')!.style.display = 'none';
        document.getElementById('operationsTable')!.style.display = 'none';
    
        document.getElementById('addOperationButton')!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;

        this.showAddForm = true;

      }
      else
      {
        this.toggleDetail(false, -1)
        
        document.getElementById('endDarkGradient')!.style.display = 'initial';
        document.getElementById('operationsTable')!.style.display = 'initial';

    
        document.getElementById('addOperationButton')!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" /></svg>`;

        this.showAddForm = false;
      }

    }

}
