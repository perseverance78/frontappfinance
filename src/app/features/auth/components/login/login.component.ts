import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;
  loginError:string|null = null;

  email:string = '';
  password:string = '';

  constructor(
    private authService: AuthService, 
    private  router:Router,
    private fb:FormBuilder
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitLogin(event: Event) {
    // Evita la navegación por defecto del ancla
    event.preventDefault();
    
    // Llama al método de envío de formulario
    if (this.loginForm.valid) {
      this.onSubmit();
    }
  }
  
  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.login(username, password);
  }

  showError(message: string) {
    this.loginError = message;
  
    // Obtén el elemento del DOM y agrega la clase 'show' para activar la animación
    setTimeout(() => {
      const errorElement = document.querySelector('.error');
      if (errorElement) {
        errorElement.classList.add('show');
      }
    }, 0); 
  
  
    setTimeout(() => {
      this.loginError = null; 
    }, 3000); // Limpiar después de 3 segundos, por ejemplo
  }
  
  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      response => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        // Manejo del error
        this.loginError = 'Usuario o contraseña incorrectos';
        this.loginForm.setErrors({ incorrect: true });
        this.showError(this.loginError)
      }
    );
  }

}
