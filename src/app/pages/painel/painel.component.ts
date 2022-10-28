import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
  host: {
    style: 'height:100%; width:100%'
  }
})
export class PainelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
