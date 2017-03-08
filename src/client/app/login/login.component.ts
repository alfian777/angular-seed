import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router,
         NavigationExtras } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {

  headerText  :String   = "Smart Device Demo";
  loginMessage:String   = "";
  isLoggedIn  :boolean  = false;
  userEmail   :String   = "";
  userPass    :String   = "";
  loading     :boolean  = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    
    this.isLoggedIn = this.authService.getLoginStatus();
    if(this.isLoggedIn){
      this.router.navigate(['']);
    }
  }

  onSubmit() { this.login(); }

  setMessage() {
    this.loginMessage = 'Logged ' + (this.authService.getLoginStatus() ? 'in' : 'out');
  }

  login() {
    this.loading = true;
    this.loginMessage = 'Trying to log in ...';
    this.authService.login(this.userEmail, this.userPass).subscribe((result : boolean) => {
      this.setMessage();
      if (result) {
        this.loading = false;
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
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
