import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../shared/models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-movie-list',
  imports: [],
  templateUrl: './admin-movie-list.html',
  styleUrl: './admin-movie-list.css',
})
export class AdminMovieList {
  private movieService = inject(MovieService);
  private router = inject(Router);

  movies = signal<Movie[]>([]);

  selectedMovie = signal<Movie | null>(null);
  showDeleteModal = signal(false);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.movieService.getAll(0, 100).subscribe({
      next: (response) => {
        this.movies.set(response.content);
      },
      error: (err) => {
        console.error('Error cargando películas:', err);
      },
    });
  }

  editMovie(movie: Movie) {
    this.router.navigate(['/admin/movies/edit', movie.id]);
  }

  deleteMovie(movie: Movie): void {
    this.selectedMovie.set(movie);
    this.showDeleteModal.set(true);
  }

  confirmDelete(): void {
    const movie = this.selectedMovie();

    if (!movie) {
      return;
    }

    this.movieService.delete(movie.id).subscribe({
      next: () => {
        this.movies.update((movies) => movies.filter((m) => m.id !== movie.id));
        this.successMessage.set(`La película "${movie.title}" fue eliminada correctamente.`);
        this.closeDeleteModal();

        setTimeout(() => {
          this.successMessage.set(null);
        }, 5000);
      },

      error: (err) => {
        console.error('Error eliminando película:', err);

        this.errorMessage.set('No se pudo eliminar la película. Inténtalo nuevamente.');

        setTimeout(() => {
          this.errorMessage.set(null);
        }, 3000);
      },
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.selectedMovie.set(null);
  }
}
