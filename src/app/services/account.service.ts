import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../model/account';
import { RegistrationRequest } from '../model/registration-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly host: string = "http://localhost:9080";

  constructor(private readonly http: HttpClient) {}

  public getAccountStatus(username: string): Observable<Account> {
    return this.http.get<any>(this.host + `/accounts/${username}`);
  }

  // TODO : Submit registration
  public submitRegistration(request: RegistrationRequest): Observable<any> {
    return this.http.post<any>(this.host + `/accounts`, request);
  }

  // TODO : Resend verification
  public resendVerification(username: string): Observable<any> {
    return of(1);
  }

  // TODO : Send password reset link
  public sendPasswordResetLink(username: string): Observable<any> {
    return of(1);
  }
}
