import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
      class:'w-full h-full'
  }
})
export class LoginComponent implements OnInit {

  showRegisterForm = false;

  constructor() { }

  ngOnInit(): void {
  }

}
