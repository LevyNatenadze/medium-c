import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent  {
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
    console.log(this.registerForm.value, 'value');
  }

}
