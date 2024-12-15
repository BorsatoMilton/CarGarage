import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../core/services/users.service.js';
import { Router } from '@angular/router';
import { RolService } from '../../core/services/rol.service.js';
import { User } from '../../core/models/user.interface.js';
import { Rol } from '../../core/models/rol.interface.js';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirClave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      rol: null,
    });
    if (this.passwordMatchValidator(this.registerForm) !== null) {
      console.log('Las contraseñas no coinciden');
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('clave')?.value === form.get('repetirClave')?.value
      ? true
      : false;
  }

  onSubmit() {
    if (this.passwordMatchValidator(this.registerForm)) {
      if (this.registerForm.valid) {
        this.usuariosService
          .getOneUserByEmailOrUsername(
            this.registerForm.value.usuario,
            this.registerForm.value.mail
          )
          .subscribe({
            next: (usuarioEncontrado: User | null) => {
              console.log('Usuario encontrado:', usuarioEncontrado);
              if (usuarioEncontrado) {
                alert('El usuario ya existe o el mail ya esta en uso!');
                return;
              } else {
                this.rolService.getOneRolByName('USUARIO').subscribe({
                  next: (rolEncontrado: Rol) => {
                    if (rolEncontrado) {
                      const usuarioFinal = {
                        ...this.registerForm.value,
                        rol: rolEncontrado.id,
                      };
                      this.usuariosService
                        .addUser(usuarioFinal)
                        .subscribe(() => {
                          alert('Usuario registrado correctamente');
                          this.registerForm.reset();
                          this.router.navigate(['/auth/login']);
                        });
                    } else {
                      alert('No se pudo obtener el rol');
                    }
                  },
                  error: (error: Error) => {
                    console.error('Error al obtener el rol:', error);
                    alert('Hubo un problema al obtener el rol');
                  },
                });
              }
            },
            error: (error: Error) => {
              console.error('Error al obtener el usuario:', error);
              alert('Hubo un problema al obtener el usuario');
            },
          });
      } else {
        alert('Por favor complete todos los campos correctamente.');
      }
    } else {
      alert('Las contraseñas no coinciden');
      this.registerForm.get('clave')?.reset();
      this.registerForm.get('repetirClave')?.reset();
    }
  }
}