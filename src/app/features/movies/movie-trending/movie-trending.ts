import { Component, inject, signal } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie';

@Component({
  selector: 'app-movie-trending',
  imports: [MovieCard],
  templateUrl: './movie-trending.html',
  styleUrl: './movie-trending.css',
})
export class MovieTrending {

  private movieService =inject(MovieService);

  movies = signal<Movie[]>([]);

  ngOnInit(): void {

    this.movieService
      .getAll(0, 8, 'rating,desc')
      .subscribe({
        next: (response) => {
          this.movies.set(response.content);
        },

        error: (err) => {
          console.error('Error cargando tendencias:', err);
        },
      });
  }
}

