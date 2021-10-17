import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../model/account';
import { RegistrationRequest } from '../model/registration-request';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor() { }

  // TODO : Get account status
  public getAccountStatus(username: string): Observable<Account> {
    const account: Account = {
      username: username,
      status: "ACTIVE"
    };

    return of(account);
  }

  // TODO : Submit registration
  public submitRegistration(request: RegistrationRequest): Observable<any> {
    return of(null);
  }

  // TODO : Resend verification
  public resendVerification(username: string): Observable<any> {
    return of(null);
  }

  // TODO : Send reset link
  public sendResetLink(username: string): Observable<any> {
    return of(null);
  }
}
