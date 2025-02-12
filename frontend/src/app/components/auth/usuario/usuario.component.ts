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
  addUserForm: FormGroup = new FormGroup({});
  userForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({}); 
  users: User[] = [];
  selectedUser: User | null = null;
  roles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsuariosService,
    private rolService: RolService,
  ) {
    this.addUserForm = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      rol: ['', Validators.required],
    });

    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      rol: ['', Validators.required],
    });
    
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
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
        rol: user.rol.id,
      });
    }
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
    if (this.addUserForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    const userData = {
      ...this.addUserForm.value,
      telefono: this.addUserForm.value.telefono.toString(),
    };
    this.userService.getOneUserByEmailOrUsername(userData.usuario, userData.mail).subscribe({
      next: (user: User | null) => {
        if (user) {
          alert('El usuario ya existe o el mail ya está en uso!');
          this.addUserForm.enable();
          return;
        }else {
          this.userService.addUser(userData).subscribe({
            next: () => {
              alert('Usuario agregado con éxito');
              this.addUserForm.reset();
              this.closeModal('addUser');
              this.ngOnInit();
              this.addUserForm.enable();
              this.addUserForm.reset();
            },
            error: (error) => {
              console.error(error);
              alert('Error al agregar el usuario.');
              this.addUserForm.enable();
            },
          });
        }
      },
      error: (error) => {
        console.error(error);
        alert('Se ha producido un error.');
        this.addUserForm.enable();
      }
    });
  }

  editUser(): void {
    if (this.selectedUser) {
      const updatedUser: User = {
        ...this.selectedUser,
        ...this.userForm.value,
        telefono: this.userForm.value.telefono.toString(),
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
    if (this.selectedUser && this.passwordForm.valid) {
      const newPassword = { newPassword: this.passwordForm.value.newPassword };
  
      this.userService.changePassword(this.selectedUser.id, newPassword).subscribe(() => {
        alert('Contraseña actualizada');
        this.closeModal('updatePassword');
        this.passwordForm.reset();
        this.ngOnInit();
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
