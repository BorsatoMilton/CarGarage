import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { UsuariosService } from '../../../core/services/users.service.js';
import { Compra } from '../../../core/models/compra.interfaces.js';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { User } from '../../../core/models/user.interface.js';
import { Category } from '../../../core/models/categories.interface.js';
import { CompraService } from '../../../core/services/compra.service.js';

@Component({
  selector: 'app-confirm-purchase',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.css',
})
export class ConfirmPurchaseComponent {
  id: string | null = null;
  destinatario: string | null = null;
  selectedCompra: Compra | null = null;
  vehiculo: Vehicle | null = null;
  usuario: User | null = null;
  idVehiculo: string | null = null;
  categoria: Category | null = null;
  compraForm: FormGroup=new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesService,
    private userService: UsuariosService,
    private compraService: CompraService,
    private router: Router
  ) {

  }

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
    this.selectedCompra = null;
  }

  confirmarCompra(): void {
    this.closeModal('confirmarCompra');
    console.log(this.vehiculo);
    console.log(this.usuario);
    if (this.vehiculo !== null && this.usuario !== null) {
      this.compraService
        .addCompra(this.usuario.id, this.vehiculo.id)
        .subscribe((data) => {
          if (data === null) {
            alert('Error al comprar el vehiculo');
          } else {
            alert('Vehiculo comprado correctamente');
            this.compraService.avisoCompraExitosa(this.usuario!.mail);
            this.router.navigate(['/']);
          }
        });
    }
  }
}
