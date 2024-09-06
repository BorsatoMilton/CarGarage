import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup = new FormGroup({});
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private passwordRecoveryService: PasswordRecoveryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    if (!this.token) { //FALTARIA TOKEN EXPIRADO, DEBO BUSCARLO EN LA DB Y VERIFICAR SI NO EXPIRO
      alert('Token inválido o expirado.');
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  resetPassword(): void {
    if (this.resetForm.valid && this.token) {
      const password = this.resetForm.get('password')?.value;
      this.passwordRecoveryService.resetPassword(this.token, password).subscribe({
        next: () => {
          alert('Contraseña actualizada correctamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);
          alert('Hubo un error al actualizar la contraseña. Por favor, inténtalo nuevamente.');
        }
      });
    }
  }
}
