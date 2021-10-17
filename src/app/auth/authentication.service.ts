import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { AuthenticationEvent } from '../model/authentication-event';
import { AuthenticationRequest } from '../model/authentication-request';
import { AuthenticationResponse } from '../model/authentication-response';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationUrl: string;
  private httpOptions: {};
  private _authenticationEvent: BehaviorSubject<AuthenticationEvent>;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.authenticationUrl = "http://localhost:9080/users/auth";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._authenticationEvent = new BehaviorSubject<AuthenticationEvent>(AuthenticationEvent.INIT);
  }

  get authenticationEvent() {
    return this._authenticationEvent;
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  public authenticate(request: AuthenticationRequest): void {
    this.http.post<AuthenticationResponse>(this.authenticationUrl, request, this.httpOptions).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('token', response.accessToken.token);
          localStorage.setItem("expire", response.accessToken.expire + "");
          this.router.navigate(['']);
          this._authenticationEvent.next(AuthenticationEvent.SUCCESS);
        } else {
          this._authenticationEvent.next(AuthenticationEvent.FAILED);
        }
      },
      (error) => {
        this._authenticationEvent.next(AuthenticationEvent.FAILED);
      }
    );
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
    this.router.navigate(['/login']);
  }

  public getAccountStatus(username?: string): Observable<Account> {
    const account: Account = {
      username: username,
      status: "UNREGISTERED"
    };

    return of(account);
  }
}
