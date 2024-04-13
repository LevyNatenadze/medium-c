import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';

import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessagesComponent]
})
export class RegisterComponent  {
  protected store = inject(Store<{state: AuthStateInterface}>);

  data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors)
  });

  registerForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(
      null,
      Validators.required
    ),
    email: new FormControl<string | null>(
      null,
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl<string | null>(
      null,
    ),
  });

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.registerForm.getRawValue()
    }
    this.store.dispatch(authActions.register({request}))
  }
}
