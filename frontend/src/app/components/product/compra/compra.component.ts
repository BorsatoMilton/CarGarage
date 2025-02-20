import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { User } from '../../../core/models/user.interface.js';
import { Compra } from '../../../core/models/compra.interfaces.js';
import { CompraService } from '../../../core/services/compra.service.js';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../core/models/categories.interface.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: 'compra.component.html',
  styleUrl: './compra.component.css',
})
export class CompraComponent implements OnInit {
  compraForm: FormGroup = new FormGroup({});
  compras: Compra[] = [];
  selectedCompra: Compra | null = null;
  vehiculo: Vehicle | null = null;
  selectedFiles: File[] = [];
  usuario: User | null = null;
  idVehiculo: string | null = null;
  categoria: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private authService: AuthService,
    private compraservice: CompraService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.compraForm = this.fb.group({
      fecha_compra: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idVehiculo = params.get('id');
      if (this.idVehiculo === null) {
        alertMethod('Realizar Compra', 'Oops, algo fue mal!', 'error');
        this.router.navigate(['/']);
      } else {
        this.vehicleService.getOneVehicle(this.idVehiculo).subscribe((data) => {
          if (data === null) {
            alertMethod('Realizar Compra', 'Oops, algo fue mal!', 'error');
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
    console.log(this.compraForm.value);
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
    this.selectedCompra = null;
    this.compraForm.reset();
  }

  comprar() {
    if (this.authService.isAuthenticated()) {
      this.compraservice
        .confirmarCompra(this.usuario!.mail, this.vehiculo!.id)
        .subscribe({
          next: () => {
            alertMethod(
              'Realizar Compra',
              'Compra realizada con éxito! Se envio un email a su casilla de correo para confirmar',
              'success'
            );
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error(error);
            alertMethod('Realizar Compra', 'Oops, algo fue mal!', 'error');
          },
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
