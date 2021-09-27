import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { AuthenticationEvent } from 'src/app/model/authentication-event';
import { AuthenticationRequest } from 'src/app/model/authentication-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private authenticationEventSubscription!: Subscription;

  constructor(
    private fb: FormBuilder, 
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });

    this.authenticationEventSubscription = this.authenticationService.authenticationEvent.subscribe(next => {
      if (next === AuthenticationEvent.SUCCESS) {
        console.log("Success");
      } else if (next === AuthenticationEvent.FAILED) {
        console.log("Failed");
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationEventSubscription.unsubscribe();
  }

  login() {
    const request: AuthenticationRequest = {
      type: "root",
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    }
    
    this.authenticationService.authenticate(request);
  }
}
