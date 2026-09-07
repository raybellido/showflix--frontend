import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authService';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../enviroment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mockApi = environment.mockApi;

  loginError = signal('');
  applied = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  fillDemo(role: 'admin' | 'user'): void {
    const credentials =
      role === 'admin'
        ? { email: 'admin@email.com', role: 'ADMIN' }
        : { email: 'maria@email.com', role: 'USUARIO' };

    this.loginForm.patchValue({
      email: credentials.email,
      password: 'demo1234',
    });

    this.applied.set(true);

    setTimeout(() => this.applied.set(false), 4000);
  }

  onSubmit() {
    this.loginError.set('');
    this.applied.set(false);

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loginError.set('Credenciales incorrectas. Inténtalo de nuevo.');
      },
    });
  }
}
