import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { QualificationsService } from '../../../core/services/qualifications.service.js';
import { UsuariosService } from '../../../core/services/users.service.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.interface.js';
import { RentsService } from '../../../core/services/rents.service.js';
import { Rent } from '../../../core/models/rent.interface.js';
import { Qualification } from '../../../core/models/qualification.inteface.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { UniversalAlertComponent } from '../../../shared/components/alerts/universal-alert/universal-alert.component.js';

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UniversalAlertComponent],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.css',
})
export class QualificationComponent implements OnInit {
  qualificationForm: FormGroup;
  locatario: User | null = null;
  rent: Rent | null = null;
  locador: User | null = null;
  rating: number = 0;
  comment: string = '';

  @ViewChild(UniversalAlertComponent) alertComponent!: UniversalAlertComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qualifiactionService: QualificationsService,
    private usuarioService: UsuariosService,
    private rentService: RentsService,
    private fb: FormBuilder
  ) {
    this.qualificationForm = this.fb.group({
      valoracion: [null, [Validators.required]],
      comentario: [''],
    });
  }

  ngOnInit(): void {
    const idLocatario = this.route.snapshot.paramMap.get('locatario')!;
    const idLocador = this.route.snapshot.paramMap.get('locador')!;
    const idAlquiler = this.route.snapshot.paramMap.get('id')!;
  
    if (idLocatario) {
      this.usuarioService.getOneUserById(idLocatario).subscribe((user) => {
        this.locatario = user;
        this.verificarCalificacion(user.id, idAlquiler);
      });
    }
  
    if (idLocador) {
      this.usuarioService.getOneUserById(idLocador).subscribe((user) => {
        this.locador = user;
        this.verificarCalificacion(user.id, idAlquiler); 
      });
    }
  
    this.rentService.getOneRent(idAlquiler).subscribe((rent) => {
      this.rent = rent;
    });
  }
  
  private verificarCalificacion(usuarioId: string, alquilerId: string): void {
    this.qualifiactionService.checkQualificationExists(usuarioId, alquilerId)
      .subscribe({
        next: (calificacion) => {
          if (calificacion) {
            this.alertComponent.showAlert('Ya has calificado a este usuario', 'info');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Error al obtener la calificación:', error);
        },
      });
  }
  

  onSubmit(): void {
    const usuarioACalificar: User | null = this.locatario || this.locador;
    if (!usuarioACalificar) {
      console.error('No se encontró un usuario para calificar.');
      return;
    }

    const nuevaCalificacion: Qualification = {
      ...this.qualificationForm.value,
      fechaCalificacion: new Date(),
      usuario: usuarioACalificar.id,
      alquiler: this.rent!.id,
    };

    this.qualifiactionService.createQualification(nuevaCalificacion).subscribe({
      next: (respuesta) => {
        alertMethod('Califica al usuario','Usuario calificado correctamente', 'success');
        console.log('Calificación enviada con éxito:', respuesta);

        this.router.navigate(['/']);
      },
      error: (error) => {
        alertMethod('Califica al usuario','Error al enviar la calificación', 'error');
        console.error('Error al enviar la calificación:', error);
      },
    });
  }
}
