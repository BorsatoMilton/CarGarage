import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RolService } from '../../core/services/rol.service.js';
import { Rol } from '../../core/models/rol.interface.js';
import { AuthService } from '../../core/services/auth.service.js';
import { User } from '../../core/models/user.interface.js';
import { transition } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: 'rol.component.html',
  styleUrl: './rol.component.css',
})
export class RolComponent implements OnInit {
  rolForm: FormGroup = new FormGroup({});
  roles: Rol[] = [];
  selectedRol: Rol | null = null;
  selectedFiles: File[] = [];
  usuario: User | null = null;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private authService: AuthService
  ) {
    this.rolForm = this.fb.group({
      nombreRol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRol();
  }

  openModal(modalId: string, rol: Rol): void {
    this.selectedRol = rol;

    if (rol) {
      this.rolForm.patchValue({
        nombreRol: rol.nombreRol
      });
    }
    console.log(this.rolForm.value);
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
    this.selectedRol = null;
    this.rolForm.reset();
  }
checkRolExists():Observable<boolean>{
  return this.rolService.getOneRolByName(this.rolForm.get('nombreRol')?.value).pipe(
    map((rol:Rol)=>!!rol),
    catchError(()=>of(false))
  );
}

addRol() {
    if (this.rolForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    const rolData = this.rolForm.value
    this.checkRolExists().subscribe((exists:boolean)=>{
      if(!exists){
        this.rolService.addRol(rolData).subscribe(()=>{
          alert('Rol creado');
          this.closeModal('addRol');
          this.rolForm.reset();
          this.ngOnInit();
        });
      }else {
        alert('El rol ya existe');
      }
    });
  }

  loadRol(): void {
    this.rolService.getAllRol().subscribe((roles: Rol[]) => {
      this.roles = roles;
    });
  }

  editRol(): void {
    if (this.selectedRol) {
      this.ngOnInit();
      const updatedRol: Rol = {
        ...this.selectedRol,
        ...this.rolForm.value,
      };

      this.rolService.editRol(updatedRol).subscribe(() => {
        alert('Rol actualizado');
        this.closeModal('editRol');
        this.ngOnInit();
        this.rolForm.reset();
      });
    }
  }

  removeRol(rol: Rol | null, modalId: string) {
    if (rol) {
      this.rolService.deleteRol(rol).subscribe(() => {
        alert('Rol eliminado');
        this.ngOnInit();
        this.closeModal(modalId);
        this.rolForm.reset();
      });
    }
  }

}
