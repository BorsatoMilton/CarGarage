import { Component } from '@angular/core';
import { UsuariosService } from '../../core/services/usuarios.service.js';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = ''; 

  constructor(private usuariosService: UsuariosService ) {}

  login(): void {

    if (!this.email || !this.password) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.usuariosService.getUsuarioByEmail(this.email).subscribe((usuario) => {
          if(!usuario) {
            alert('Usuario Inexistente!');
            this.email = '';
            this.password = '';
          } else if(this.password === usuario.clave) {
            alert('Bienvenido');
          } else {
            alert('Contraseña Incorrecta!');
            this.password='';
          }
        }
    )}

}

