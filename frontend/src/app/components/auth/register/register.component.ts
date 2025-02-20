import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../core/services/users.service.js';
import { Router } from '@angular/router';
import { RolService } from '../../../core/services/rol.service.js';
import { User } from '../../../core/models/user.interface.js';
import { Rol } from '../../../core/models/rol.interface.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';
import { UniversalAlertComponent } from '../../../shared/components/alerts/universal-alert/universal-alert.component.js';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UniversalAlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  @ViewChild(UniversalAlertComponent) alertComponent! : UniversalAlertComponent;

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
              if (usuarioEncontrado) {
                this.alertComponent.showAlert(
                  'El usuario o el email ya se encuentran registrados', 'error')
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
                          alertMethod(
                            'Usuario registrado',
                            'El usuario se ha registrado correctamente',
                            'success'
                          );
                          this.registerForm.reset();
                          this.router.navigate(['/auth/login']);
                        });
                    } else {
                      alertMethod(
                        'Ocurrio un error',
                        'Oops! Algo salio mal, intentelo nuevamente',
                        'error'
                      );
                    }
                  },
                  error: (error: Error) => {
                    console.error('Error al obtener el rol:', error);
                    alertMethod(
                      'Ocurrio un error',
                      'Oops! algo salio mal, intentelo nuevamente',
                      'error'
                    );
                  },
                });
              }
            },
            error: (error: Error) => {
              console.error('Error al obtener el usuario:', error);
              alertMethod('Ocurrio un error', 'Oops! algo salio mal, intentelo nuevamente', 'error');
            },
          });
      } else {
        this.alertComponent.showAlert('Formulario invalido. Por favor complete todos los campos', 'error');
      }
    } else {
      this.alertComponent.showAlert('Las contraseñas no coinciden', 'error');
      this.registerForm.get('clave')?.reset();
      this.registerForm.get('repetirClave')?.reset();
    }
  }
}