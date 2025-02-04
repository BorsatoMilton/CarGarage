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
  todayDate: Date = new Date();
  fechaInvalida: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehiculoService: VehiclesService,
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
    
    // Deshabilitamos días anteriores a hoy
    const today = new Date();
    const todayString = this.formatDate(today);
    if (dayString < todayString) return false;
    
    // Deshabilitamos si la fecha cae en alguno de los rangos reservados
    for (const reserva of this.fechasReservadas) {
      if (dayString >= reserva.fechaInicio && dayString <= reserva.fechaFin) {
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
            this.fechasReservadas = reservas.map((reserva: any) => ({
              fechaInicio: reserva.fechaHoraInicioAlquiler,
              fechaFin: reserva.fechaHoraDevolucion,
            }));
          }
        });
    }
    this.usuario = this.authService.getCurrentUser();
    
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
    return this.fechasReservadas.map((reserva) => {
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
    }).flat();
  }
  
  validarFecha(): void {
    const fechaSeleccionada = this.rentForm.get('fechaHoraInicioAlquiler')?.value;
    this.fechaInvalida = this.isDateDisabled(fechaSeleccionada);
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
          console.log('Respuesta del servidor:', response);
          if (this.usuario?.mail && this.idVehiculo) {
            const idAlquiler = response.id;
            this.rentService
              .confirmRent(this.usuario.mail, idAlquiler)
              .subscribe({
                next: () => {
                  alert('Se le envió un mail con la confirmación del alquiler');
                  this.router.navigate(['/']);
                },
                error: (error) => {
                  console.error(error);
                  alert('Error al confirmar el alquiler.');
                },
              });
          }
        },
        error: (error) => {
          console.error(error);
          alert('Error al realizar el alquiler.');
        },
      });
    }
  }
}
