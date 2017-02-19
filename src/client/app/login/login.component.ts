import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router,
         NavigationExtras } from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {

  headerText:String = "Smart Device Demo";
  loginMessage:String = "";
  isLoggedIn:Boolean = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.getLoginStatus();
  }

  setMessage() {
    this.loginMessage = 'Logged ' + (this.authService.getLoginStatus() ? 'in' : 'out');
  }

  login() {
    this.loginMessage = 'Trying to log in ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
    this.isLoggedIn = this.authService.getLoginStatus();
  }

}
