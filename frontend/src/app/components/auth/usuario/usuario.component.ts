import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UniversalAlertComponent } from '../../../shared/components/alerts/universal-alert/universal-alert.component.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UniversalAlertComponent],
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

@ViewChild(UniversalAlertComponent) alertComponent! : UniversalAlertComponent

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
      this.alertComponent.showAlert('Por favor, complete todos los campos requeridos.', 'error');
      return;
    }
    const userData = {
      ...this.addUserForm.value,
      telefono: this.addUserForm.value.telefono.toString(),
    };
  
    this.userService.getOneUserByEmailOrUsername(userData.usuario, userData.mail).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.alertComponent.showAlert('El usuario ya existe o el mail ya está en uso!', 'error');
          this.addUserForm.enable();
          return;
        } else {
          this.createUser(userData);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.createUser(userData);
        } else {
          console.error(error);
          this.alertComponent.showAlert('Se ha producido un error.', 'error');
          this.addUserForm.enable();
        }
      }
    });
  }
  
  private createUser(userData: any) {
    this.userService.addUser(userData).subscribe({
      next: () => {
        alertMethod('Alta de usuarios', 'Usuario agregado correctamente', 'success');
        this.addUserForm.reset();
        this.closeModal('addUser');
        this.ngOnInit();
        this.addUserForm.enable();
      },
      error: (error) => {
        console.error(error);
        alertMethod('Alta de usuarios', 'Se ha producido un error.', 'error');
        this.addUserForm.enable();
      },
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
        alertMethod('Edición de usuarios','Usuario editado correctamente', 'success');
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
        alertMethod('Cambio de contraseña','Contraseña actualizada correctamente', 'success');
        this.closeModal('updatePassword');
        this.passwordForm.reset();
        this.ngOnInit();
      });
    }
  }
  
  removeUser(user: User | null, modalId: string) {
    if (user) {
      this.userService.deleteUser(user).subscribe(() => {
        alertMethod('Baja de usuarios','Usuario eliminado correctamente', 'success');
        this.ngOnInit();
        this.closeModal(modalId);
        this.userForm.reset();
      });
    }
  }

}
