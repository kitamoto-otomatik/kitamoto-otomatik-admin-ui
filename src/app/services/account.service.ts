import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor() { }

  public getAccountStatus(username?: string): Observable<Account> {
    const account: Account = {
      username: username,
      status: "ACTIVE"
    };

    return of(account);
  }
}
