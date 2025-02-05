import { Component } from '@angular/core';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Rent } from '../../../core/models/rent.interface.js';
import { RentsService } from '../../../core/services/rents.service.js';
import { CommonModule } from '@angular/common';
import { VehiclesService } from '../../../core/services/vehicles.service.js';

@Component({
  selector: 'app-confirm-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-rent.component.html',
  styleUrl: './confirm-rent.component.css',
})
export class ConfirmRentComponent {
  rent: Rent | null = null;
  vehiculo: Vehicle | null = null;
  totalAlquiler: number = 0;

  constructor(
    private route: ActivatedRoute,
    private rentService: RentsService,
    private vehicleService: VehiclesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const idAlquiler = params['id'];
      if (idAlquiler !== null) {
        this.rentService.getOneRent(idAlquiler).subscribe((data) => {
          if (data === null) {
            alert('Alquiler no encontrado');
            this.router.navigate(['/']);
          } else {
            this.rent = data;
            if (this.rent) {
              this.vehicleService
                .getOneVehicle(this.rent.vehiculo.id)
                .subscribe((data) => {
                  this.vehiculo = data;
                  if (this.vehiculo?.precioAlquilerDiario) {
                    const fechaInicio = this.rent
                      ? new Date(this.rent.fechaHoraInicioAlquiler)
                      : null;
                    const fechaDevolucion = this.rent
                      ? new Date(this.rent.fechaHoraDevolucion)
                      : null;
                    const diferenciaMilisegundos =
                      fechaDevolucion && fechaInicio
                        ? fechaDevolucion.getTime() - fechaInicio.getTime()
                        : 0;
                    const diferenciaDias = Math.ceil(
                      diferenciaMilisegundos / (24 * 60 * 60 * 1000)
                    );
                    if(diferenciaDias > 0){
                    this.totalAlquiler =
                      diferenciaDias * this.vehiculo.precioAlquilerDiario;
                    }else {
                      this.totalAlquiler = this.vehiculo.precioAlquilerDiario;
                    }
                  }
                });
            }
          }
        });
      }
    });
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

  confirmRent() {

    if (this.rent !== null) {
      const updatedRent = {
        ...this.rent,
        estadoAlquiler: 'CONFIRMADO'
      };
      this.rentService.editRent(updatedRent).subscribe({
        next: () => {
          alert('Alquiler confirmado');
          this.closeModal('confirmarAlquiler');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al confirmar el alquiler:', error);
          alert('Error al confirmar el alquiler');
        },
      });
    }
  }
}
