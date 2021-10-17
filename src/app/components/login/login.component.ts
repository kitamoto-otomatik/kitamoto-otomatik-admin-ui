import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  public form!: FormGroup;
  @ViewChild("usernameElement") usernameElement!: ElementRef;
  @ViewChild("firstNameElement") firstNameElement!: ElementRef;
  @ViewChild("passwordElement") passwordElement!: ElementRef;

  public showRegistrationForm: boolean = false;
  public showAccountConfirmationForm: boolean = false;
  public showPasswordField: boolean = false;
  public showForgotPasswordForm: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private changeDetector : ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      const hasError: boolean = !!password && !!confirmPassword && password.value !== confirmPassword.value;

      return hasError ? { passwordsDoesNotMatch: true } : null;
    };

    this.form = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(8) ]],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8) ]]
    }, {
      validators: [passwordValidator]
    });
  }
  
  ngAfterViewInit(): void {
    this.usernameElement.nativeElement.focus();
  }

  ngOnDestroy(): void {
  }

  get username(): AbstractControl {
    return this.form.controls['username'];
  }

  get firstName(): AbstractControl {
    return this.form.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.form.controls['lastName'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  get confirmPassword(): AbstractControl {
    return this.form.controls['confirmPassword'];
  }

  initialLoginFormKeydown(event: any): void {
    if (event.key === "Enter") {
      this.checkAccount();
    }
  }

  registrationFormKeydown(event: any): void {
    if (event.key === "Enter") {
      this.submitRegistration();
    }
  }

  submitLoginFormKeydown(event: any): void {
    if (event.key === "Enter") {
      this.submitLogin();
    }
  }

  forceFormValidation(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  resetFormValidation(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsUntouched({ onlySelf: true });
      }
    });
  }

  checkAccount(): void {
    this.forceFormValidation();
    
    if (this.username.valid) {
      // Get account status
      this.authenticationService.getAccountStatus(this.username.value).subscribe(e => {
        this.resetFormValidation();

        switch (e.status) {
          case "UNREGISTERED":
            this.showRegistrationForm = true;
            this.changeDetector.detectChanges();
            this.firstNameElement.nativeElement.focus();
            break;
          case "UNVERIFIED":
            // Resend confirmation email
            this.showAccountConfirmationForm = true;
            break;
          case "ACTIVE":
            this.showPasswordField = true;
            this.changeDetector.detectChanges();
            this.passwordElement.nativeElement.focus();
            break;
          default:
        }
      });
    }
  }

  submitRegistration(): void {
    this.forceFormValidation();

    if (this.form.valid) {
      // Register

      this.showRegistrationForm = false;
      this.showAccountConfirmationForm = true;
    }
  }

  backToLogin(): void {
    this.resetFormValidation();

    this.showRegistrationForm = false;
    this.showAccountConfirmationForm = false;
  }

  submitLogin(): void {
    this.forceFormValidation();

    if (!this.password.errors || !this.password.errors.required) {
      this.password.setErrors({ incorrect: true });

      // Login
    }
  }

  forgotPassword(): void {
    this.showPasswordField = false;
    this.showForgotPasswordForm = true;
  }

  sendResetLink(): void {
    // Reset Link
  }
}
