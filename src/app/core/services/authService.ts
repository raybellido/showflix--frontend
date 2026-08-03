import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../enviroment';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private tokenSignal = signal<string | null>(localStorage.getItem('token'));

  isAuthenticated = this.tokenSignal.asReadonly();

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSignal.set(token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
  }
}
