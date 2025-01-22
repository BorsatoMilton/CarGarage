import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../core/models/user.interface.js';
import { UsuariosService } from '../../../core/services/users.service.js';
import { Rol } from '../../../core/models/rol.interface.js';
import { RolService } from '../../../core/services/rol.service.js';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: 'usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  users: User[] = [];
  selectedUser: User | null = null;
  roles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private rolService: RolService,
  ) {
    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      direccion: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.rolService.getAllRol().subscribe((data) => {
      this.roles = data;
    });
    this.userService.getAllUser().subscribe((data) => {
      this.users = data;
    });
  }

  openModal(modalId: string, user: User): void {
    this.selectedUser = user;
    if (user) {
      this.userForm.patchValue({
        usuario: user.usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        mail: user.mail,
        telefono: user.telefono,
        direccion: user.direccion,
        rol: user.rol,
      });
    }
    console.log(this.userForm.value);
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal(modalId: string) {
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop != null) {
      backdrop.parentNode?.removeChild(backdrop);
    }
    this.selectedUser = null;
    this.userForm.reset();
  }

  addUser() {
    if (this.userForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    this.userForm.disable();
    const userData = this.userForm.value
    this.userService.getOneUserByEmailOrUsername(userData.usuario, userData.mail).subscribe({
      next: (user: User | null) => {
        if (user) {
          alert('El usuario ya existe o el mail ya está en uso!');
          this.userForm.enable();
          return;
        }else {
          this.userService.addUser(userData).subscribe({
            next: () => {
              alert('Usuario agregado con éxito');
              this.userForm.reset();
              this.closeModal('addUser');
              this.ngOnInit();
              this.userForm.enable();
              this.userForm.reset();
            },
            error: (error) => {
              console.error(error);
              alert('Error al agregar el usuario.');
              this.userForm.enable();
            },
          });
        }
      },
      error: (error) => {
        console.error(error);
        alert('Se ha producido un error.');
        this.userForm.enable();
      }
    });
  }

  editUser(): void {
    if (this.selectedUser) {
      this.ngOnInit();
      const updatedUser: User = {
        ...this.selectedUser,
        ...this.userForm.value,
      };

      this.userService.editUser(updatedUser).subscribe(() => {
        alert('Usuario actualizado');
        this.closeModal('editUser');
        this.ngOnInit();
        this.userForm.reset();

      });
    }
  }

  updatePassword(): void {

    if (this.selectedUser) {
      const updatedUser: User = {
        ...this.selectedUser,
        ...this.userForm.value,
      };

      this.userService.editUser(updatedUser).subscribe(() => {
        alert('Contraseña actualizada');
        this.closeModal('updatePassword');
        this.ngOnInit();
        this.userForm.reset();
   
      });
    }
  }

  removeUser(user: User | null, modalId: string) {
    if (user) {
      this.userService.deleteUser(user).subscribe(() => {
        alert('Usuario eliminado');
        this.ngOnInit();
        this.closeModal(modalId);
        this.userForm.reset();
      });
    }
  }

}
