import { Component, OnInit } from '@angular/core';
import { AuthService }       from '../shared/auth/auth.service';
import { Router }            from '@angular/router';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  menuShow:boolean = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
  }

  menuToggle(){
    this.menuShow = !this.menuShow;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
