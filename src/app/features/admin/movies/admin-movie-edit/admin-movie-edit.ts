import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../shared/models/movie';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreService } from '../../../../core/services/genreService';
import { Genre } from '../../../../shared/models/genre';

@Component({
  selector: 'app-admin-movie-edit',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin-movie-edit.html',
  styleUrl: './admin-movie-edit.css',
})
export class AdminMovieEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private movieService = inject(MovieService);
  private genreService = inject(GenreService);

  private fb = inject(FormBuilder);

  movie = signal<Movie | null>(null);
  genres = signal<Genre[]>([]);

  movieForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    genreId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar géneros
    this.genreService.getAll().subscribe({
      next: (genres) => {
        this.genres.set(genres);
      },
      error: (err) => {
        console.error('Error cargando géneros:', err);
      },
    });

    // Cargar película
    this.movieService.getById(id).subscribe({
      next: (movie) => {
        this.movie.set(movie);

        this.movieForm.patchValue({
          title: movie.title,
          description: movie.description,
          genreId: movie.genreId,
        });
      },
      error: (err) => {
        console.error('Error cargando película:', err);
      },
    });
  }

  save(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }
    const id = this.movie()?.id;
    if (!id) {
      return;
    }

    const request = this.movieForm.getRawValue();
    console.log('Enviando:', request);
    this.movieService.update(id, request).subscribe({
      next: (movie) => {
        console.log('Película actualizada:', movie);

        this.movie.set(movie);

        this.router.navigate(['/admin/movies']);
      },

      error: (err) => {
        console.error('Error actualizando película:', err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/movies']);
  }
}
