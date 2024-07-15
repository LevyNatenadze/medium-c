import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer';
import { AuthStateInterface } from '../../types/authState.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessagesComponent]
})
export class LoginComponent  {
  protected store = inject(Store<{state: AuthStateInterface}>);

  data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors)
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(
      null,
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl<string | null>(
      null,
    ),
  });

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.loginForm.getRawValue()
    }
    this.store.dispatch(authActions.login({request}))
  }
}
