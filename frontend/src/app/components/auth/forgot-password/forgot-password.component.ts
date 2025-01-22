import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { PasswordRecoveryService } from '../../../core/services/password-recovery.service';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  recoverForm: FormGroup = new FormGroup({});;

  constructor(
    private fb: FormBuilder,
    private passwordRecoveryService: PasswordRecoveryService,
    
  ) { }

   ngOnInit(): void {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recoverPassword(): void {
    if (this.recoverForm.valid) {
      const email = this.recoverForm.get('email')?.value;
      this.passwordRecoveryService.sendRecoveryEmail(email).subscribe({
        next: () => {
          alert('Se ha enviado un correo a tu dirección de email');
        },
        error: (error) => {
          console.error('Error al enviar el correo:', error);
          alert('Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.');
        }
      });
    }
  }

}
