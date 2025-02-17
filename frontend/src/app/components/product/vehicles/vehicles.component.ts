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
import { BrandComponent } from '../brand/brand.component.js';
import { BrandsService } from '../../../core/services/brands.service.js';
import { Brand } from '../../../core/models/brands.interfaces.js';
import { CategoriesService } from '../../../core/services/categories.service.js';
import { Category } from '../../../core/models/categories.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { User } from '../../../core/models/user.interface.js';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: 'vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehicleComponent implements OnInit {
  vehicleForm: FormGroup = new FormGroup({});
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  brands: Brand[] = [];
  categories: Category[] = [];
  selectedFiles: File[] = [];
  usuario: User | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private brandService: BrandsService,
    private categoriesService: CategoriesService,
    private authService: AuthService
  ) {
    this.vehicleForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioVenta: [''],
      precioAlquilerDiario: [''],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      propietario: [''],
      transmision: ['', Validators.required],
      kilometros: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.brandService.getAllBrand().subscribe((data) => {
      this.brands = data;
    });
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    this.usuario = this.authService.getCurrentUser();
  
    if (this.usuario !== null) {
      this.vehicleForm.patchValue({ propietario: this.usuario.id });
      this.loadVehicle();
    }


  }

  openModal(modalId: string, vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;

    if (vehicle) {
      this.vehicleForm.patchValue({
        modelo: vehicle.nombre,
        descripcion: vehicle.descripcion,
        fechaAlta: vehicle.fechaAlta,
        fechaBaja: vehicle.fechaBaja,
        precioVenta: vehicle.precioVenta,
        precioAlquilerDiario: vehicle.precioAlquilerDiario,
        kilometros: vehicle.kilometros,
        anio: vehicle.modelo,
        marca: vehicle.marca,
        categoria: vehicle.categoria,
        transmision: vehicle.transmision,
      });
    }
    console.log(this.vehicleForm.value);
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
    this.selectedVehicle = null;
    this.vehicleForm.reset();
  }

  addVehicle() {
    if (this.vehicleForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    if(this.vehicleForm.get('precioVenta')?.value === null && this.vehicleForm.get('precioAlquilerDiario')?.value === null) {
      alert('Por favor coloque un precio de venta o un precio de alquiler diario.');
      return;
    }
    this.vehicleForm.disable();
    const formData = new FormData();

    formData.append('modelo', this.vehicleForm.get('nombre')?.value);
    formData.append('descripcion', this.vehicleForm.get('descripcion')?.value);
    formData.append('precioVenta', this.vehicleForm.get('precioVenta')?.value);
    formData.append(
      'precioAlquilerDiario',
      this.vehicleForm.get('precioAlquilerDiario')?.value
    );
    formData.append('transmision', this.vehicleForm.get('transmision')?.value);
    formData.append('kilometros', this.vehicleForm.get('kilometros')?.value);
    formData.append('propietario', this.vehicleForm.get('propietario')?.value);
    formData.append('anio', this.vehicleForm.get('modelo')?.value);
    formData.append('marca', this.vehicleForm.get('marca')?.value);
    formData.append('categoria', this.vehicleForm.get('categoria')?.value);

    if (this.selectedFiles.length === 0) {
      alert('Por favor, selecciona al menos una imagen para el vehículo.');
      return;
    }

    this.selectedFiles.forEach((file, index) => {
      formData.append('imagenes', file, file.name);
    });
    
    this.vehicleService.addVehicle(formData).subscribe({
      next: () => {
        alert('Vehículo agregado con éxito');
        this.vehicleForm.reset();
        this.selectedFiles = [];
        this.closeModal('addVehicle');
        this.ngOnInit();
        this.vehicleForm.enable();
      },
      error: (error) => {
        console.error(error);
        alert('Error al agregar el vehículo.');
        this.vehicleForm.enable();
      },
    });
    this.vehicleForm.reset();
    this.selectedFiles = [];
  }

  loadVehicle(): void {
    if (this.usuario !== null) {
      this.vehicleService.getAllVehicleByUser(this.usuario.id).subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      });
    }
  }

  editVehicle(): void {
    if (this.selectedVehicle) {
      this.ngOnInit();
      const updatedVehicle: Vehicle = {
        ...this.selectedVehicle,
        ...this.vehicleForm.value,
      };

      this.vehicleService.editVehicle(updatedVehicle).subscribe(() => {
        alert('Vehiculo actualizado');
        this.closeModal('editVehicle');
        this.ngOnInit();
        this.vehicleForm.reset();
        this.selectedFiles = [];
      });
    }
  }

  removeVehicle(vehicle: Vehicle | null, modalId: string) {
    if (vehicle) {
      this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
        alert('Vehiculo eliminado');
        this.ngOnInit();
        this.closeModal(modalId);
        this.vehicleForm.reset();
      });
    }
  }

  onFilesSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.selectedFiles = Array.from(fileInput.files);
    }
  }
}