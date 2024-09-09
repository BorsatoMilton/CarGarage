import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiclesService } from '../../core/services/vehicles.services.js';
import { Vehicle } from '../../core/models/vehicles.interface.js';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: 'vehicles.component.html',
  styleUrl: './vehicles.component.css'
})

export class VehicleComponent implements OnInit {
vehicleForm: FormGroup=new FormGroup({}); 
vehicles: Vehicle[] = [];
selectedVehicle: Vehicle | null = null;


constructor(
private fb: FormBuilder, 
private vehicleService: VehiclesService
)
 {this.vehicleForm = this.fb.group({
  nombreVehiculo: ['', Validators.required]
  });}

ngOnInit(): void {
    this.loadVehicle()
}

openModal(modalId: string, vehicle: Vehicle): void{
  this.selectedVehicle = vehicle;
  if (vehicle) {
    this.vehicleForm.patchValue({
      nombreVehiculo: vehicle.nombreVehiculo,
    });
  }
  const modalDiv = document.getElementById(modalId);
  if(modalDiv != null){
    modalDiv.style.display='block';
  }
}

closeModal(modalId: string){
  const modalDiv = document.getElementById(modalId);
  if(modalDiv != null){
    modalDiv.style.display='none';
  }
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop != null) {
    backdrop.parentNode?.removeChild(backdrop);
  }
  this.selectedVehicle= null;
}

addVehicle() {
  if (this.vehicleForm.valid) {
    const vehicleData = this.vehicleForm.value;
  
    this.vehicleService.addVehicle(vehicleData).subscribe(() => {
      alert('Vehiculo agregada' );
      this.vehicleForm.reset();
      this.closeModal('addVehicle');
      this.loadVehicle() 
    });
  }

}

loadVehicle(): void {
  this.vehicleService.getAllVehicle().subscribe((vehicles : Vehicle[]) => {
    this.vehicles = vehicles;
  });
}

editVehicle(): void {
  if (this.selectedVehicle) {
    const updatedVehicle: Vehicle = {
      ...this.selectedVehicle,
      ...this.vehicleForm.value
    };
    this.vehicleService.editVehicle(updatedVehicle).subscribe(() => {
      alert('Vehiculo actualizado');
      this.closeModal('editVehicle');
      this.loadVehicle();
      this.vehicleForm.reset();
    });
  }
}

deleteVehicle(vehicle: Vehicle | null, modalId: string) {
  if(vehicle){
      this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
        alert('Vehiculo eliminado');
        this.loadVehicle();
        this.closeModal(modalId);
        this.vehicleForm.reset();
      });
  }
}
}

