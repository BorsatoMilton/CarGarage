import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RolComponent } from './rol/rol.component';
import { UserComponent } from './usuario/usuario.component';
import { onlyAdmin } from '../../guards/onlyAdmin.guard';
import { isLoggedInGuard } from '../../guards/is-logged-in.guard.js';
import { ProfileComponent } from './profile/profile.component';

export const authRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'rol', component: RolComponent, canActivate: [onlyAdmin] },
    { path: 'users', component: UserComponent, canActivate: [onlyAdmin] },
    { path: 'profile', component: ProfileComponent, canActivate: [isLoggedInGuard] },

];
