import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const MercadoPago: any; // Declara el SDK para TypeScript

@Component({
  selector: 'app-mercado-pago-checkout',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  @ViewChild('checkoutContainer') checkoutContainer!: ElementRef; // Referencia al contenedor del botón
  private mercadoPago: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeMercadoPago();
  }

  ngOnDestroy(): void {
    // Limpiar el contenedor al destruir el componente
    this.checkoutContainer.nativeElement.innerHTML = '';
  }

  private async initializeMercadoPago(): Promise<void> {
    // Cargar el SDK dinámicamente (por si no se cargó en index.html)
    await this.loadScript('https://sdk.mercadopago.com/js/v2');

    // Inicializar Mercado Pago con tu public key (usa environment variables)
    this.mercadoPago = new MercadoPago('APP_USR-ec9df218-0d1b-4230-a9f2-bdade6b76ffc', {
      locale: 'es-AR'
    });

    // Obtener el preferenceId desde tu backend
    this.http.post<any>('http://localhost:3000/api/mercadopago/create-preference', {})
      .subscribe({
        next: (response) => this.renderCheckoutButton(response.preferenceId),
        error: (error) => console.error('Error al crear el pago:', error)
      });
  }

  private renderCheckoutButton(preferenceId: string): void {
    // Renderizar el botón de Checkout Pro
    this.mercadoPago.checkout({
      preference: {
        id: preferenceId
      },
      render: {
        container: this.checkoutContainer.nativeElement, // Contenedor HTML
        label: 'Pagar', // Texto del botón
        type: 'wallet', // Tipo de checkout
      }
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }
}