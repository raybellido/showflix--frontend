import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authService';
import { MovieSearchService } from '../../../core/services/movieSearchService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  private movieSearchService = inject(MovieSearchService);

  isAuthenticated = this.authService.isAuthenticated;

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onSearch(value: string) {
    console.log('Buscando:', value);
    this.movieSearchService.setSearchTerm(value);
  }
}
