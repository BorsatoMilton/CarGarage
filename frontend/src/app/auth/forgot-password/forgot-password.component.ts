import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';
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
      const email = this.recoverForm.value;
      this.passwordRecoveryService.sendRecoveryEmail(email).subscribe(() => {
        alert('Se ha enviado un correo a tu dirección de email');
      }
      );
    }
  }

}
