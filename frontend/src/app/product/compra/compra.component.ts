import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VehiclesService } from '../../core/services/vehicles.service.js';
import { Vehicle } from '../../core/models/vehicles.interface.js';
import { AuthService } from '../../core/services/auth.service.js';
import { User } from '../../core/models/user.interface.js';
import { transition } from '@angular/animations';
import { Compra } from '../../core/models/compra.interfaces.js';
import { CompraService } from '../../core/services/compra.service.js';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private authService: AuthService,
    private compraservice: CompraService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.compraForm = this.fb.group({ //crea un formulario reactivo con FormBuilder
      fecha_compra: ['', Validators.required],
      precio_total: ['', Validators.required],
    });
  }

  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.idVehiculo = params.get('id');
      if(this.idVehiculo === null){
      alert('Vehiculo no encontrado');
      this.router.navigate(['/']);
    }else{
      this.vehicleService.getOneVehicle(this.idVehiculo).subscribe((data) => {
      if(data === null){
        alert('Vehiculo no encontrado');
        this.router.navigate(['/']);
      }else{
        this.vehiculo = data;
      }
    })};
    });
    
    this.usuario = this.authService.getCurrentUser();

    if (this.usuario !== null) {
      this.compraForm.patchValue({ propietario: this.usuario.id });
    }

    this.loadCompra();
  }


  openModal(modalId: string, compra: Compra): void {
    this.selectedCompra = compra;

    if (compra) {
      this.compraForm.patchValue({
        fechacompra: compra.fecha_compra,
        preciototal: compra.precio_total,
      });
    }
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

  addCompra() {
    if (this.compraForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.compraForm.disable();
    const formData = new FormData();
    formData.append('fechacompra', this.compraForm.get('fechacompra')?.value);
    formData.append('preciototal', this.compraForm.get('preciototal')?.value);
    
    this.compraservice.addCompra(formData).subscribe({
      next: () => {
        alert('Compra agregada con éxito');
        this.compraForm.reset();
        this.closeModal('addCompra');
        this.ngOnInit();
        this.compraForm.enable();
      },
      error: (error) => {
        console.error(error);
        alert('Error al agregar la compra.');
        this.compraForm.enable();
      },
    });
    this.compraForm.reset();
  }


  loadCompra(): void {
    this.compraservice.getAllCompra().subscribe((compras: Compra[]) => {
      this.compras = compras;
    });
  }

  comprar(): void {
    if (this.authService.isAuthenticated()) {
      console.log('Usuario autenticado. Procesando compra...');
    } else {
      console.log('Usuario no autenticado. Redirigiendo a login...');
      this.router.navigate(['/login']);
    }
  }
}
