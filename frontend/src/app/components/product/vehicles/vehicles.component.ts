import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { BrandsService } from '../../../core/services/brands.service.js';
import { Brand } from '../../../core/models/brands.interfaces.js';
import { CategoriesService } from '../../../core/services/categories.service.js';
import { Category } from '../../../core/models/categories.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { User } from '../../../core/models/user.interface.js';
import { UniversalAlertComponent } from '../../../shared/components/alerts/universal-alert/universal-alert.component.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UniversalAlertComponent],
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

  @ViewChild(UniversalAlertComponent) alertComponent! : UniversalAlertComponent;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private brandService: BrandsService,
    private categoriesService: CategoriesService,
    private authService: AuthService
  ) {
    this.vehicleForm = this.fb.group({
      modelo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioVenta: [null],
      precioAlquilerDiario: [null],
      anio: ['', Validators.required],
      marca: [null, Validators.required],
      categoria: [null, Validators.required],
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
      this.loadVehicle();
    }   

  }

  openModal(modalId: string, vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;

    if (vehicle) {
      this.vehicleForm.patchValue({
        modelo: vehicle.modelo,
        descripcion: vehicle.descripcion,
        fechaAlta: vehicle.fechaAlta,
        fechaBaja: vehicle.fechaBaja,
        precioVenta: vehicle.precioVenta,
        precioAlquilerDiario: vehicle.precioAlquilerDiario,
        kilometros: vehicle.kilometros,
        anio: vehicle.anio,
        marca: vehicle.marca?.id,
        categoria: vehicle.categoria?.id,
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
      this.alertComponent.showAlert('Por favor, complete todos los campos.', 'error');
      return;
    }
    if (
      this.vehicleForm.get('precioVenta')?.value === null &&
      this.vehicleForm.get('precioAlquilerDiario')?.value === null
    ) {
      this.alertComponent.showAlert('Por favor, ingrese un precio de venta o alquiler.', 'error');
      return;
    }
    this.vehicleForm.disable();
    const formData = new FormData();
    formData.append('modelo', this.vehicleForm.get('modelo')?.value);
    formData.append('descripcion', this.vehicleForm.get('descripcion')?.value);
    formData.append('precioVenta', this.vehicleForm.get('precioVenta')?.value);
    formData.append('precioAlquilerDiario', this.vehicleForm.get('precioAlquilerDiario')?.value);
    formData.append('transmision', this.vehicleForm.get('transmision')?.value);
    formData.append('kilometros', this.vehicleForm.get('kilometros')?.value);
    if(this.usuario){
      formData.append('propietario', this.usuario.id.toString());
    }
    formData.append('anio', this.vehicleForm.get('anio')?.value);
    formData.append('marca', this.vehicleForm.get('marca')?.value);
    formData.append('categoria', this.vehicleForm.get('categoria')?.value);
    if (this.selectedFiles.length === 0) {
      this.alertComponent.showAlert('Por favor, seleccione una imagen.', 'error');
      this.vehicleForm.enable();
      return;
    }
    this.selectedFiles.forEach((file) => {
      formData.append('imagenes', file, file.name);
    });  
    this.vehicleService.addVehicle(formData).subscribe({
      next: () => {
        alertMethod('Alta de vehiculos','Vehículo agregado exitosamente', 'success');
        this.closeModal('addVehicle');
        this.loadVehicle();
        this.vehicleForm.enable();
        this.vehicleForm.reset();
        if (this.usuario) {
          this.vehicleForm.patchValue({ propietario: this.usuario.id });
        }
        this.selectedFiles = [];
      },
      error: (error) => {
        console.error(error);
        this.alertComponent.showAlert('Oops! Error al agregar vehículo', 'error');
        this.vehicleForm.enable();
      },
    });
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

    if (
      this.vehicleForm.get('precioVenta')?.value === null &&
      this.vehicleForm.get('precioAlquilerDiario')?.value === null
    ){
      alertMethod('Edición de vehículo', 'Por favor, ingrese un precio de venta o alquiler', 'error');
      return
    }
    const formValue = this.vehicleForm.value;
    const updatedVehicle: Vehicle = {
      ...this.selectedVehicle,
      ...formValue,
      propietario: this.selectedVehicle.propietario
    };

    this.vehicleService.editVehicle(updatedVehicle).subscribe(() => {
      alertMethod('Edición de vehículo', 'Vehículo editado exitosamente', 'success');
      this.closeModal('editVehicle');
      this.loadVehicle();
    });
  }
}
  removeVehicle(vehicle: Vehicle | null, modalId: string) {
    if (vehicle) {
      this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
        alertMethod('Eliminación de vehiculo','Vehículo eliminado exitosamente', 'success');
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