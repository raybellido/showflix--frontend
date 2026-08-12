import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/authService';
import { MovieSearchService } from '../../../core/services/movieSearchService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  private movieSearchService = inject(MovieSearchService);

  isAuthenticated = this.authService.isAuthenticated;
  menuOpen = signal(false);

  logout() {
    this.authService.logout();
    this.menuOpen.set(false);
    this.router.navigate(['login']);
  }

  onSearch(value: string) {
    console.log('Buscando:', value);
    this.movieSearchService.setSearchTerm(value);
  }
}
