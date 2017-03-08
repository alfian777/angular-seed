import { Injectable} from '@angular/core';
import { JwtHelper } from './jwtHelper';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  public isLoggedIn  :boolean;
  public token       :string;
  public redirectUrl :string;
  private headers    :Headers;
  private loginBroadcast = new Subject<boolean>();
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    // Check token validity
    if (this.token != null){
      console.log(
        this.jwtHelper.getTokenExpirationDate(this.token),
        this.jwtHelper.isTokenExpired(this.token)
      );
      if (this.jwtHelper.isTokenExpired(this.token)) this.isLoggedIn = false;
      else this.isLoggedIn = true;
    } 
    else this.isLoggedIn = false;     

  }

  login(userEmail: String, userPass: String): Observable<boolean> {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://akmtaiwan1.apps.exosite.io/development/user/token', 
                          JSON.stringify({ email: userEmail, pass: userPass }),
                          {headers:this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: userEmail, token: token }));

                    // return true to indicate successful login
                    this.isLoggedIn = true;
                    this.loginBroadcast.next(this.isLoggedIn);
                    return true;
                } else {
                    // return false to indicate failed login
                    this.isLoggedIn = false;
                    this.loginBroadcast.next(this.isLoggedIn);
                    return false;
                }
            });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.token = null;
    localStorage.removeItem('currentUser');
    this.loginBroadcast.next(this.isLoggedIn);
  }

  getLoginStatus(): boolean{
    return this.isLoggedIn;
  }

  getLoginBroadcast(): Observable<boolean>{
    return this.loginBroadcast.asObservable();
  }

  getToken(): String{
    return this.token;
  }

}