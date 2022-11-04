import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
  host: {
    style: 'height:100%; width:100%'
  }
})
export class PainelComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    /** Checks if the user is logged in; */
    if (!this.auth.isLoggedIn()) this.logout();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['login']).then(() => {location.reload()});
  }

}
