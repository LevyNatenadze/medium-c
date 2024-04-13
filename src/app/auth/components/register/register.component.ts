import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting } from '../../store/reducer';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule]
})
export class RegisterComponent  {
  protected store = inject(Store<{state: AuthStateInterface}>);
  isSubmitting$ = this.store.select(selectIsSubmitting);

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
