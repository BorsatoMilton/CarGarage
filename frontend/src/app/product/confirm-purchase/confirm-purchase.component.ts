import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VehiclesService } from '../../core/services/vehicles.service.js';
import { UsuariosService } from '../../core/services/users.service.js';

@Component({
  selector: 'app-confirm-purchase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.css'
})
export class ConfirmPurchaseComponent {

  id: string | null = null;
  destinatario: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesService,
    private userService:  UsuariosService) {
    
   }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.destinatario = params['destinatario'];
    });

  }

}
