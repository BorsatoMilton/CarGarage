import { Component } from '@angular/core';
import { Rent } from '../../../core/models/rent.interface.js';
import { RentsService } from '../../../core/services/rents.service.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { CommonModule } from '@angular/common';
import { forEach } from 'angular';

@Component({
  selector: 'app-rent-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rent-list.component.html',
  styleUrl: './rent-list.component.css'
})
export class RentListComponent {
    alquileres: Rent[] = [];
    selectedRent: Rent | null = null;
  
    constructor(private rentService: RentsService,
      private authService: AuthService
    ) { }
  
    ngOnInit(): void {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser !== null) {
        this.rentService.getRentsByUser(currentUser.id).subscribe((data) => {
          this.alquileres = data;
          console.log(this.alquileres)
        })   
      }  
    }
  
    openModal(modalId: string, rent: Rent): void{
      this.selectedRent = rent;
      const modalDiv = document.getElementById(modalId);
      if(modalDiv != null){
        modalDiv.style.display='block';
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
    
    cancelRent(rent: Rent | null, modalId: string): void {
      if(rent){
        this.rentService.cancelRent(rent).subscribe(() => {
          alert('Alquiler cancelado con exito!');
          this.ngOnInit();
          this.closeModal(modalId);
        });
      }
    }

}
