import { Component, OnInit } from '@angular/core';
import { RentsService } from '../../../core/services/rents.service.js';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { User } from '../../../core/models/user.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { FormGroup } from '@angular/forms';
import { Rent } from '../../../core/models/rent.interface.js';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';
import { QualificationCalculator } from '../../../shared/components/qualification-calculator/qualification-calculator.js';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  rentForm: FormGroup;
  vehiculo: Vehicle | undefined;
  fechasReservadas: { fechaInicio: string; fechaFin: string }[] = [];
  idVehiculo: string | null = null;
  usuario: User | null = null;
  todayDate: Date = new Date() //new Date(new Date().setDate(new Date().getDate() + 1));
  fechaInvalida: boolean = false;
  currentSlideIndex = 0;
  promedioCalificaciones: number = 0;
  cantidadCalificaciones: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehiculoService: VehiclesService,
    private qualificationCalculator: QualificationCalculator,
    private rentService: RentsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.rentForm = this.fb.group(
      {
        fechaHoraInicioAlquiler: ['', Validators.required],
        fechaHoraDevolucion: ['', Validators.required],
      },
      { validators: this.dateRangeValidatorFactory() }
    );
  }

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;

    const dayString = this.formatDate(d);

    const today = new Date();
    const todayString = this.formatDate(today);
    if (dayString < todayString) return false;

    for (const reserva of this.fechasReservadas) {
      const reservaInicio = new Date(reserva.fechaInicio);
      const reservaFin = new Date(reserva.fechaFin);
      if (d >= reservaInicio && d <= reservaFin) {
        return false;
      }
    }

    return true;
  };

  ngOnInit(): void {
    this.idVehiculo = this.route.snapshot.paramMap.get('id');
    if (this.idVehiculo) {
      this.vehiculoService.getOneVehicle(this.idVehiculo).subscribe(
        (data: Vehicle) => {
          this.vehiculo = data;
          this.cargarCalificacionesPropietario();
        },
        (error) => {
          console.error('Error para obtener el vehiculo:', error);
        }
      );
      this.rentService
        .getRentsByVehicle(this.idVehiculo)
        .subscribe((reservas) => {
          if (!reservas) {
            return;
          } else {
            this.fechasReservadas = reservas
              .filter((reserva: any) => reserva.estadoAlquiler !== 'CANCELADO' && reserva.estadoAlquiler !== 'NO CONFIRMADO')
              .map((reserva: any) => ({
                fechaInicio: reserva.fechaHoraInicioAlquiler,
                fechaFin: reserva.fechaHoraDevolucion,
              }));
          }
        });
    }
    this.usuario = this.authService.getCurrentUser();
  }


  
  private cargarCalificacionesPropietario(): void {
    if (!this.vehiculo?.propietario?.id) return;
  
    this.qualificationCalculator.getPromedio(this.vehiculo.propietario.id).subscribe({
      next: (promedio) => {
        this.promedioCalificaciones = promedio;
        this.obtenerCantidadCalificaciones(this.vehiculo!.propietario!.id)
      },
      error: (err) => {
        console.error('Error obteniendo calificaciones:', err);
        this.promedioCalificaciones = 0;
      }
    });
  }
  
  private obtenerCantidadCalificaciones(idPropietario:string){
    this.qualificationCalculator.getCalificacionesTotal(idPropietario).subscribe({
      next: (cantidad) => {
        this.cantidadCalificaciones = cantidad;
      },
      error: (err) => {
        console.error('Error obteniendo cantidad de calificaciones:', err);
        this.cantidadCalificaciones = 0;
      }
    });

  }

  dateRangeValidatorFactory() {
    return (group: AbstractControl): ValidationErrors | null => {
      const startValue = group.get('fechaHoraInicioAlquiler')?.value;
      const endValue = group.get('fechaHoraDevolucion')?.value;
      if (!startValue || !endValue) {
        return null;
      }
      const startDate = new Date(startValue);
      const endDate = new Date(endValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        return { startDateInPast: true };
      }
      if (startDate > endDate) {
        return { dateRangeInvalid: true };
      }
      const isOverlapping = this.fechasReservadas.some((reserva) => {
        const reservaInicio = new Date(reserva.fechaInicio);
        const reservaFin = new Date(reserva.fechaFin);
        return (
          (startDate >= reservaInicio && startDate <= reservaFin) ||
          (endDate >= reservaInicio && endDate <= reservaFin) ||
          (startDate <= reservaInicio && endDate >= reservaFin)
        );
      });
      if (isOverlapping) {
        return { dateRangeOverlapping: true };
      }
      return null;
    };
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isDateDisabled(date: string): boolean {
    return this.fechasReservadas.some((reserva) => {
      const inicio = this.formatDate(new Date(reserva.fechaInicio));
      const fin = this.formatDate(new Date(reserva.fechaFin));
      return date >= inicio && date <= fin;
    });
  }

  getDisabledDates(): { year: number; month: number; day: number }[] {
    return this.fechasReservadas
      .map((reserva) => {
        const inicio = new Date(reserva.fechaInicio);
        const fin = new Date(reserva.fechaFin);
        const fechasBloqueadas = [];

        for (let d = inicio; d <= fin; d.setDate(d.getDate() + 1)) {
          fechasBloqueadas.push({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
          });
        }

        return fechasBloqueadas;
      })
      .flat();
  }

  validarFecha(): void {
    const fechaSeleccionada = this.rentForm.get(
      'fechaHoraInicioAlquiler'
    )?.value;
    this.fechaInvalida = this.isDateDisabled(fechaSeleccionada);
  }

nextSlide(): void {
  if (this.vehiculo && this.vehiculo.imagenes) {
    this.currentSlideIndex = 
      (this.currentSlideIndex + 1) % this.vehiculo.imagenes.length;
  }
}

previousSlide(): void {
  if (this.vehiculo && this.vehiculo.imagenes) {
    this.currentSlideIndex = 
      (this.currentSlideIndex - 1 + this.vehiculo.imagenes.length) % 
      this.vehiculo.imagenes.length;
  }
}

goToSlide(index: number): void {
  this.currentSlideIndex = index;
}

  rent(): void {
    if (this.authService.isAuthenticated()) {
      const rentData: Rent = {
        ...this.rentForm.value,
        estadoAlquiler: 'PENDIENTE',
        locatario: this.usuario?.id,
        vehiculo: this.idVehiculo,
        locador: this.vehiculo?.propietario,
      };
      this.rentService.addRent(rentData).subscribe({
        next: (response) => {
          if (this.usuario && this.idVehiculo) {
            const idAlquiler = response.id;
            this.rentService.confirmRentMail(this.usuario, idAlquiler).subscribe({
              next: () => {
                this.router.navigate(['/']);
                alertMethod(
                  'Alquilar vehiculo',
                  'Se ha enviado un mail a su casilla de correo para confirmar el alquiler',
                  'success'
                );
              },
              error: (error) => {
                console.error(error);
                alertMethod('Alquilar vehiculo', 'Oops! Algo salió mal al confirmar el alquiler', 'error');
              },
            });
          }
        },
        error: (error) => {
          console.error(error);
          alertMethod('Alquilar vehiculo', 'Oops! Algo salió mal al crear el alquiler', 'error');
        },
      });
    }
  }
}
