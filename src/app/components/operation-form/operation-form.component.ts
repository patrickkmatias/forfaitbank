import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css']
})
export class OperationFormComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.initOperationForm();
  }

  initOperationForm() {
  }

  toggleButton(note: number) {

    // note == 10 ? this.note10 = !this.note10 : undefined; 
    // note == 50 ? this.note50 = !this.note50 : undefined; 
    // note == 100 ? this.note100 = !this.note100 : undefined; 

    function activate() {

      document.querySelector('#note'+String(note))!.classList.add('btn-active')
    }

    function deactivate() {

      document.querySelector('#note'+String(note))!.classList.remove('btn-active')
    }


  }

}
