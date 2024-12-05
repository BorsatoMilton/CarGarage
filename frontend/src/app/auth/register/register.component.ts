import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../core/services/users.service.js';
import { Router } from '@angular/router';
import { RolService } from '../../core/services/rol.service.js';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService,
    private router: Router, private rolService: RolService
  ) {}

  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirClave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      rol: null
    }, )
    if( this.passwordMatchValidator(this.registerForm) !== null){
      console.log('Las contraseñas no coinciden');
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('clave')?.value === form.get('repetirClave')?.value
      ? true : false;
  }

  onSubmit() {
    if (this.passwordMatchValidator(this.registerForm)) {
      if (this.registerForm.valid) { 
        // Falta validar si el mail y/o usuario ya existe
        this.rolService.getOneRolByName('USUARIO').subscribe({
          next: (rolEncontrado) => {
            if (rolEncontrado) {
              const usuarioFinal = {
                ...this.registerForm.value,
                rol: rolEncontrado.id
              };
              this.usuariosService.addUser(usuarioFinal).subscribe(() => {
                alert('Usuario registrado correctamente');
                this.registerForm.reset();
                this.router.navigate(['/auth/login']);
              });
            } else {
              alert('No se pudo obtener el rol');
            }
          },
          error: (error) => {
            console.error('Error al obtener el rol:', error);
            alert('Hubo un problema al obtener el rol');
          }
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