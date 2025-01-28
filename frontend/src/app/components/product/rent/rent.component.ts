import { Component } from '@angular/core';
import { RentsService } from '../../../core/services/rents.service.js';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { User } from '../../../core/models/user.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { FormGroup } from '@angular/forms';
import { Rent } from '../../../core/models/rent.interface.js';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css',
})
export class RentComponent {
  idVehiculo: string | null = null;
  vehiculo: Vehicle | null = null;
  usuario: User | null = null;
  rentForm: FormGroup = new FormGroup({});
  selectedRent: Rent | null = null;

  constructor(
    private fb: FormBuilder,
    private rentService: RentsService,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehiclesService,
    private authService: AuthService
  ) {
      this.rentForm = this.fb.group({ //crea un formulario reactivo con FormBuilder
        fecha_alquiler: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idVehiculo = params.get('id');
      if (this.idVehiculo === null) {
        alert('Vehiculo no encontrado');
        this.router.navigate(['/']);
      } else {
        this.vehicleService.getOneVehicle(this.idVehiculo).subscribe((data) => {
          if (data === null) {
            alert('Vehiculo no encontrado');
            this.router.navigate(['/']);
          } else {
            this.vehiculo = data;
          }
        });
      }
    });
    this.usuario = this.authService.getCurrentUser();
  }

  openModal(modalId: string): void {
    console.log(this.rentForm.value);
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
    this.selectedRent = null;
    this.rentForm.reset();
  }

  pre_rent(): void {
    if (this.authService.isAuthenticated()) {
      console.log('Usuario autenticado. Procesando alquiler...');
      this.rentService.confirmRent(this.usuario!.mail, this.vehiculo!.id).subscribe({
        next: () => {
          alert('Se le envio un mail con la confirmación del alquiler');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          alert('Error al realizar la compra.');
        },
      });
    } else {
      console.log('Usuario no autenticado. Redirigiendo a login...');
      this.router.navigate(['/login']);
    }
  }
  
}
