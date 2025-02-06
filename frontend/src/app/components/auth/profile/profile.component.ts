import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../core/services/users.service.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { User } from '../../../core/models/user.interface.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usuario: User | null = null
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  
  constructor(
    private userService: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      usuario: [this.usuario?.usuario],
      nombre: [this.usuario?.nombre],
      apellido: [this.usuario?.apellido],
      telefono: [this.usuario?.telefono],
      mail: [this.usuario?.mail],
      direccion: [this.usuario?.direccion]
    });
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    return group.get('newPassword')?.value === group.get('confirmPassword')?.value ? null : { notMatching: true };
  }

  updateProfile(): void {
    console.log('Edit profile');
  }

  changePassword(): void {
    if (this.usuario?.id) {
      this.userService.changePassword(this.usuario.id, this.passwordForm.value).subscribe({
        next: () => {
          this.closeModal('updatePassword');
        },
        error: () => {
          console.error('Error al cambiar la contraseña');
        }
      });
    } else {
      console.error('El id del usuario es indefinido');
    }
  }

  openModal(modalId: string): void {
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
  }


}
