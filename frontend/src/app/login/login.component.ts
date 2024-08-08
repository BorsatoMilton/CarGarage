import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
    usuarios: any[] = [];
    loginForm: FormGroup;

    constructor(private usuariosService: UsuariosService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['',[ Validators.required, Validators.minLength(6)]], //Es para el login, por el momento en desuso
        });
    }

    
    getAllUsuarios(): void {
      this.usuariosService.getAllUsuarios().subscribe(
        response => {
          this.usuarios = response.data;
          console.log('Lista de Usuarios:', this.usuarios);
        },
        error => {
          console.error('Failed to get usuarios:', error);
        }
      );
    }

}
