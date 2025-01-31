import { Component } from '@angular/core';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { User } from '../../../core/models/user.interface.js';
import { Category } from '../../../core/models/categories.interface.js';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { UsuariosService } from '../../../core/services/users.service';
import { Rent } from '../../../core/models/rent.interface.js';
import { RentsService } from '../../../core/services/rents.service.js';

@Component({
  selector: 'app-confirm-rent',
  standalone: true,
  imports: [],
  templateUrl: './confirm-rent.component.html',
  styleUrl: './confirm-rent.component.css',
})
export class ConfirmRentComponent {
  id: string | null = null;
  destinatario: string | null = null;
  selectedRent: Rent | null = null;
  vehiculo: Vehicle | null = null;
  usuario: User | null = null;
  idVehiculo: string | null = null;
  categoria: Category | null = null;
  compraForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesService,
    private rentService: RentsService,
    private userService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.destinatario = params['destinatario'];
      if (this.id !== null && this.destinatario !== null) {
        this.userService
          .getOneUserByEmail(this.destinatario)
          .subscribe((data) => {
            if (data === null) {
              alert('Usuario no encontrado');
              this.router.navigate(['/']);
            } else {
              this.usuario = data;
            }
          });

        this.vehicleService.getOneVehicle(this.id!).subscribe((data) => {
          if (data === null) {
            alert('Vehiculo no encontrado');
            this.router.navigate(['/']);
          } else {
            this.vehiculo = data;
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
    this.selectedRent = null;
  }


}
