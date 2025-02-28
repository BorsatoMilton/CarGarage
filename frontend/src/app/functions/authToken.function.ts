import { HttpHeaders } from '@angular/common/http';

export class AuthToken {
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}