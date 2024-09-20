import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../core/services/usuarios.service.js';
import { RouterModule } from '@angular/router';

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
    private usuariosService: UsuariosService
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
    
  
    this.usuariosService.login(this.user, this.password).subscribe({
      next: () => {
        alert('Bienvenido');
        
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
