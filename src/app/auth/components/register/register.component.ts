import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink]
})
export class RegisterComponent  {
  protected store = inject(Store);
  
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
    const registerRequest: RegisterRequestInterface = {
      user: this.registerForm.getRawValue()
    }

    console.log(registerRequest);

    this.store.dispatch(register({registerRequest}))
  }
}
