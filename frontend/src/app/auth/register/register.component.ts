import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../core/services/usuarios.service.js';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirClave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]] 
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
    if(this.passwordMatchValidator(this.registerForm)){
      if (this.registerForm.valid) { // Falta validar si el mail y/o usuario ya existe
          this.usuariosService.addUsuario(this.registerForm.value).subscribe(() => {
            alert('Usuario registrado correctamente');
            this.registerForm.reset();
            this.router.navigate(['/auth/login']);
          });
      }else{
        alert('Por favor complete todos los campos correctamente.');
      }
    }else{
      alert('Las contraseñas no coinciden');
      this.registerForm.get('clave')?.reset();
      this.registerForm.get('repetirClave')?.reset();
    }
  }
}