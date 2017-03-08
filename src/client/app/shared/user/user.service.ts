import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class UserService {
  public  user    : User ;
  private headers : Headers;
  private userDetInFlight : boolean = false;
  private currentUserBroadcast = new Subject<User>();

  constructor(private http: Http, private authService: AuthService) {
    
    /*
    this.authService.getLoginBroadcast().subscribe(
        (loginState) => {
            console.log(`its getLoginBroadcast calling ${loginState}`);
            if(!loginState)this.user = null;
        }
    );
    */

    this.authService.getLoginBroadcast()
    .switchMap(loginState => this.getCurrentUser(!loginState))
    .subscribe(returnedUser =>  this.user = returnedUser);    
 
  }

  getCurrentUserHTTP(): Observable<User> {
    this.userDetInFlight = true;
    console.log("HTTP : user/detail fetch")
    this.headers = new Headers({'Authorization': this.authService.getToken()});
    return this.http.get('https://akmtaiwan1.apps.exosite.io/development/user/detail', {headers:this.headers} )
        .map((response: Response) => {
            this.userDetInFlight = false;
            // API succes if all element is confirmed 
            let user_join_dt  = response.json() && response.json().creation_date;
            let user_email    = response.json() && response.json().email;
            let user_name     = response.json() && response.json().name;
            let user_id       = response.json() && response.json().id;
            let user_status   = response.json() && response.json().status;

            if (user_join_dt && user_email && user_name && user_id && user_status) {
                

                this.user = new User(<string>user_name,<string>user_email,
                                    <number>user_join_dt,<number>user_status,
                                    <string>user_id);
                this.currentUserBroadcast.next(this.user);
                return this.user;
            } else {
                // throw error
                this.user = null;
                throw new Error("API Data Invalid");
            }
        });
  }

  getCurrentUser(isNull? : boolean): Observable<User>{   
    var retval : Observable<User>;
    // If OPTIONAL parameter isNull present return null object
    if (isNull)
        retval = Observable.of(null);
    // If current user is still in fetch return broadcast
    else if (this.userDetInFlight)
        retval = this.currentUserBroadcast.asObservable();
    // If current user is null return observable from HTTP
    else if (this.user == null)
        retval =  this.getCurrentUserHTTP();
    // Else return current saved user
    else
        retval = Observable.of(this.user);

    return retval.catch(e => Observable.of(e));
  }
}