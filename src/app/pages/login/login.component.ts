import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(
    private auth: AuthenticationService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    
    /** Checks if the user is logged in; */
    if (this.auth.isLoggedIn())
      this.router.navigate(['painel']);
    else
      this.auth.logout();
  }

}
