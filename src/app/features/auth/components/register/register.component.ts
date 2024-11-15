import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { min } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,  private  router:Router,) {
    this.registerForm = this.fb.group(
      {
        name:  ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const password_confirmation = form.get('password_confirmation')?.value;

    return password === password_confirmation ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, password_confirmation } = this.registerForm.value;
      this.authService.register({ name, email, password, password_confirmation }).subscribe({
        next: (response: any) => {
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Error en el registro:', err);
        },
      });
    }
  }


}
