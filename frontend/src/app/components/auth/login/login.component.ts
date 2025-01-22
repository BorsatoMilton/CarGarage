import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service.js';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  user: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Por favor complete todos los campos correctamente.');
      return;
    }
  
    this.user = this.loginForm.get('user')?.value;
    this.password = this.loginForm.get('password')?.value;
    
  
    this.authService.login(this.user, this.password).subscribe({
      next: (usuario) => {
        this.authService.setUserSession(usuario);
        alert(`Bienvenido, ${usuario.nombre}!`);
        this.router.navigate(['/']);
        
      },
      error: (error) => {
        if (error.status === 404) {
          alert('Usuario no encontrado');
        } else if (error.status === 401) {
          alert('Contraseña incorrecta');
        } else {
          alert('Error al comunicarse con el servidor');
        }
        this.loginForm.reset();
      }
    });
  }
  
}
