import { Component } from '@angular/core';
import { Compra } from '../../../core/models/compra.interfaces.js';
import { CompraService } from '../../../core/services/compra.service.js';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {
  compras: Compra[] = [];
  selectedPurchase: Compra | null = null;

  constructor(private compraService: CompraService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser !== null) {
      this.compraService.getAllCompraByUser(currentUser.id).subscribe((data) => {
        this.compras = data;
      });
    }
      
  }

  openModal(modalId: string, purchase: Compra): void{
    this.selectedPurchase = purchase;
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
    this.selectedPurchase= null;
  }
  

  cancelarCompra(compra: Compra, modalId: string): void {
    this.compraService.cancelarCompra(compra.id).subscribe(() => {
      alertMethod('Cancelar Compra', 'Compra cancelada con exito!', 'success');
      this.ngOnInit();
      this.closeModal(modalId);
      
    });
  }

}
